"use client"
const About = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">This project was created by <span className="orange_gradient text-center">Sharabh Ojha</span> and <span className="green_gradient text-center">Ishaan Akula</span></h1>
            <br className="max-md:hidden"/>
            <p className="desc text-center">The site and backend code was built by Sharabh, while the Flutter app was built by Ishaan.</p>
            <br className="max-md:hidden"/>
            <p className="desc text-center">In a world where access to education is considered a fundamental right, it is disheartening to witness the barriers that blind students face in obtaining the same educational resources and content as their sighted peers. We believe that every student, regardless of visual impairment, deserves equal opportunities to explore and engage with the vast knowledge and information present in print media.</p>
            <p className="desc text-center">The traditional approach of relying solely on Braille, though commendable, has not been fully embraced or implemented to its fullest extent. As a result, blind students often find themselves at a disadvantage, struggling to access the wealth of information contained within print materials.</p>
            <p className="desc text-center">❤️ Our mission is to bridge this gap and empower blind students by providing them with an innovative solution through <span className="teal_gradient">EchoReader</span>. ❤️</p>
            <p className="desc text-center">With our app, blind students can simply submit pictures of the text they wish to read, and through the magic of OCR, the app swiftly converts the images into text. But we don't stop there. We understand the importance of retaining the essence of the written word and the joy of reading. Therefore, the text is transformed into melodic audio clips, allowing blind students to immerse themselves in the same content as their sighted peers.</p>
            <p className="desc text-center">Through EchoReader, we strive to empower blind students with independence, autonomy, and a sense of inclusion in the educational realm. We believe that education should not be limited by one's visual abilities but should be an all-encompassing experience that promotes growth, knowledge, and self-discovery for every learner.</p>
            <p className="desc text-center">We envision a future where blind students no longer feel left behind, where they can explore literature, textbooks, articles, and any print media with ease, fostering a love for learning that knows no boundaries. By providing alternative avenues for accessing educational resources, we aspire to level the playing field, giving blind students an equal chance to pursue their passions, expand their horizons, and thrive academically.</p>
            <p className="desc text-center pb-10">💙 Because education should be limitless and accessible to all, we are dedicated to making a difference in the lives of blind students through EchoReader. 💙</p>  

        </section>
    );
}

export default About;