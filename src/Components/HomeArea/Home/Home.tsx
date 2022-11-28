import "./Home.css";
import CouponImg from "..//..//..//Assets/Image/discount-coupon.png"

function Home(): JSX.Element {

    return (
        <div className="Home">
            <div className="divMaster">
               
                <h1 className="welcome">Welcome to the best Coupon website ! </h1>
                <h4 className="p1">We provide an easy and friendly purchasing experience for all customers and firms. </h4>
                <h4 className="p2">We guarantee proffesionalism and special experience to all users! </h4>
                <img className="homeCoupon" src={CouponImg} />                 
                </div>  
                <h6 className="footer">By Or Chen &copy;</h6>      
                                   
        </div>
    );
}

export default Home;
