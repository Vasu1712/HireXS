import LoggedInContainer from "../containers/LoggedInContainer";

const contact = () => {
    return (
        <LoggedInContainer curActiveScreen="help">
            <div className="w-5/6 bg-gradient-to-r from-color1 to-color2 ml-8 rounded-xl p-8">
                <h3 className="fcf-h3 font-medium text-color6 text-4xl ">Contact Us</h3>
                <div className="flex">
                    <form id="fcf-form-id" className="fcf-form-class mt-10" method="post" action="contact-form-process.php">

                        <div className="fcf-form-group w-full">
                            <label htmlFor="Name" className="fcf-label text-white w-full">Your name</label>
                            <div className="fcf-input-group">
                                <input type="text" id="Name" name="Name" className="fcf-form-control h-8 mt-2 rounded w-96 px-2" required />
                            </div>
                        </div>

                        <div className="fcf-form-group mt-8">
                            <label htmlFor="Email" className="fcf-label text-white">Your email address</label>
                            <div className="fcf-input-group">
                                <input type="email" id="Email" name="Email" className="fcf-form-control h-8 mt-2 rounded w-96 px-2" required />
                            </div>
                        </div>

                        <div className="fcf-form-group mt-8">
                            <label htmlFor="Message" className="fcf-label text-white">Your message</label>
                            <div className="fcf-input-group">
                                <textarea id="Message" name="Message" className="fcf-form-control mt-2 rounded w-96 px-2 py-1" rows="6" maxLength="3000" required></textarea>
                            </div>
                        </div>

                        <div className="fcf-form-group mt-8">
                            <button type="submit" id="fcf-button" className="w-40 text-white border p-2 my-2 rounded">Send Message</button>
                        </div>

                    </form>
                    <div className="">
                        <img alt="contact us" src="contact.gif" className="w-10/12 mx-20 p-8" />
                    </div>
                </div>
            </div>
        </LoggedInContainer>
    )
}

export default contact;