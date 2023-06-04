"use client"

import FileUpload from "@components/Uploader"

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">Giving the blind <span className="teal_gradient text-center">the ability to read.</span></h1>
            <br className="max-md:hidden"/>
            <p className="desc text-center">EchoReader utilizes state-of-the-art <span className="teal_gradient font-semibold">OCR</span> and <span className="teal_gradient font-semibold">voice generation</span> technology to create audio representations of text, making print media more accessible than ever before.</p>
            <h3 className="desc text-center font-bold">Upload your files here.</h3>
            <br className="max-md:hidden"/>
            <FileUpload/>

        </section>
    );
}

export default Home;