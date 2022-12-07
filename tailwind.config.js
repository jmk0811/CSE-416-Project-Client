/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                main1: "#6474E5",
                main2: "#9AA4EC",
                point1: "#F4A4A4",
                gray1: "#595959",
                bg1: "#f6f8fc",
                hover1: "#eaebef",
                activate1: "#f2f6fc",
                activate2: "#d3e3fd",
            },
            fontSize: {
                "30": "30px",
                "28": "28px",
                "26": "26px",
                "24": "24px",
                "22": "22px",
                "20": "20px",
                "18": "18px",
                "16": "16px",
                "14": "14px",
            },
        },
    },
    plugins: [],
};
