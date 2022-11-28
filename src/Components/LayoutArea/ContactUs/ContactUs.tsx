import "./ContactUs.css";
import { BsGithub } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AiFillLinkedin } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import notificationService from "../../../Services/NotificationService";

function ContactUs(): JSX.Element {

    const navigate = useNavigate();

    function send() {
        navigate("/home");
        notificationService.success("Thank you for your query! We will response shortly.")
    }


    return (
        <div className="ContactUs">

            <form className="contactform">
                <h2 className="contactUs">CONTACT US</h2>
                <div className="inputArea">
                    <input type="text" placeholder="Write your full name here.."></input>
                    <input type="email:" placeholder="Let us know how to contact you back.."></input>
                    <textarea className="bigContent" maxLength={200} placeholder="What would you like to tell us.."></textarea>
                </div>
                <button className="sendButton" onClick={send}>Send Message</button>
                <div className="communication">
                    <span></span><MdEmail /> &nbsp; orooshch0@gmail.com <br /> <br />
                    <span></span><BsGithub /> &nbsp; https://github.com/orChen89 <br /> <br />
                    <span></span><AiFillLinkedin />&nbsp;  https://www.linkedin.com/in/or-chen-711302142/
                </div>
            </form>

        </div>
    );
}

export default ContactUs;
