import '@styles/globals.css';
import Nav from "@components/Nav";

export const metadata = {
    title: "EchoReader",
    description: "An OCR for the visually impaired"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
            <Nav/>
                <div className="main">
                    <div className="gradient"/>
                </div>

                <main className="app">
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout;