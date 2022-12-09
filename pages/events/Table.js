import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useRouter } from 'next/router'
import { getUserByIdAPIMethod } from '../../api/client';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Table(props) {
  const router = useRouter();
  const handleEvent = (e) => {
    // router.push(`/work/${e.id}`); subfolder 하는 방법 알아보기
    router.push(`/event/${e.id}`);
  }

  const [event, setEvent] = React.useState([]);

  const formatEvent = () => {
    const formatEvent = [];
    props.events.forEach((event) => {
        const format = {
            id: event._id,
            title: event.title,
            recruitmentStartDate: dateDropFormat(event.recruitmentStartDate),
            recruitmentEndDate: dateDropFormat(event.recruitmentEndDate),
            eventStartDate: dateDropFormat(event.eventStartDate),
            eventEndDate: dateDropFormat(event.eventEndDate),
            point: event.point,
            interests: event.interests || [],
        }
        formatEvent.push(format);
    })
    return formatEvent
  }

  React.useEffect(() => {
    let searchFormat = formatEvent()
    if(!(props.keyword === undefined || props.keyword === "")) {
        searchFormat = searchFormat.filter((e) => e.title.toLowerCase().includes(props.keyword))
    }
    setEvent(searchFormat)
}, [props.events]);

React.useEffect(() => {
    let filterEvent = formatEvent();
    if(!(props.keyword === undefined || props.keyword === "")) {
        filterEvent = filterEvent.filter((e) => e.title.toLowerCase().includes(props.keyword))
    }
    filterEvent = filterEvent.filter((e) => new Date(e.recruitmentStartDate) >= new Date(props.recruitmentStartDate));
    filterEvent = filterEvent.filter((e) => new Date(e.recruitmentEndDate) <= new Date(props.recruitmentEndDate));
    filterEvent = filterEvent.filter((e) => new Date(e.eventStartDate) >= new Date(props.startDate));
    filterEvent = filterEvent.filter((e) => new Date(e.eventEndDate) <= new Date(props.endDate));
    if(props.point == 1) filterEvent = filterEvent.filter((e) => e.point < 10);
    else if(props.point == 2) filterEvent = filterEvent.filter((e) => e.point >= 10 && e.point < 20);
    else if(props.point == 3) filterEvent = filterEvent.filter((e) => e.point < 20);

    if(props.animal === "outlined") filterEvent = filterEvent.filter((e) => !((e.interests).includes('animal')));
    if(props.education === "outlined") filterEvent = filterEvent.filter((e) => !((e.interests).includes('education')));
    if(props.environment === "outlined") filterEvent = filterEvent.filter((e) => !((e.interests).includes('environment')));
    if(props.healthcare === "outlined") filterEvent = filterEvent.filter((e) => !((e.interests).includes('healthcare')));
    if(props.sports === "outlined") filterEvent = filterEvent.filter((e) => !((e.interests).includes('sports')));

    console.log(filterEvent);
    setEvent(filterEvent);

}, [props.recruitmentStartDate,
    props.recruitmentEndDate,
    props.startDate,
    props.endDate,
    props.point,
    props.animal,
    props.education,
    props.environment,
    props.healthcare,
    props.sports,
    props.keyword]);


  
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.id}
        onRowClick={handleEvent}
        columns={[
          { field: 'title',  width: 200, headerName: 'Title' },
          { field: 'recruitmentStartDate', width: 200, headerName: 'Apply Start' },
          { field: 'recruitmentEndDate', width: 200, headerName: 'Apply End' },
          { field: 'eventStartDate', width: 200, headerName: 'Work Start' },
          { field: 'eventEndDate', width: 200, headerName: 'Work End' },
          { field: 'point', headerName: 'Points' },
        ]}
        rows={event}
        components={{ Toolbar: CustomToolbar }}
        style={{marginTop: '20px'}}
      />
    </div>
  );
}

function dateDropFormat(date){
    const splitDate = date.split('T');
    return splitDate[0]
}

