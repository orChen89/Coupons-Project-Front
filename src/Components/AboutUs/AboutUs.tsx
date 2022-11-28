import "./AboutUs.css";
import About from "..//../Assets/Image/Aboutus.jpg"

function AboutUs(): JSX.Element {
    return (
        <div className="AboutUs">
            <img className="aboutImg" src={About} />
            <div>
                <h1 className="head">WHAT WE DO </h1>
                <div className="content">
                    We are offering special products with special deals!
                    Our coupons are exclusive and modern! All this with an emphasis on excellent service
                    and a great tech experience.
                    Between our carefully selected businesses, our products, and unbeatable prices,
                    with us you can feel confident to explore new opportunities.
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
