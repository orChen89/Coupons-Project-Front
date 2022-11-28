import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">

            <div className="pageError" title="404">404</div> <br /> <br />

            <span>THE PAGE YOU ARE LOOKING FOR DOESN'T EXIST!</span>

        </div>
    );
}

export default PageNotFound;
