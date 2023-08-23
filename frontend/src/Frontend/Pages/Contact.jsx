import React, { useState, useEffect } from "react";
import Title from "../../Common/Title";
import Alert from "../../Common/Alert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Contact.css";
import { axiosClientServiceApi } from "../../util/axiosUtil";

import contactImg from "../../Images/contact.png";
import { getCookie, removeCookie, setCookie } from "../../util/cookieUtil";
import { removeActiveClass } from "../../util/ulrUtil";

const Contact = () => {
  const formObject = { firstName: "", email: "", phone: "", message: "" };
  const [formData, setFormData] = useState(formObject);
  const [mesg, setMesg] = useState("");
  const [show, setShow] = useState(false);
  const [formerror, setFormerror] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    removeActiveClass();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormerror((prevFormData) => ({ ...prevFormData, [name]: "" }));
  };

  /**
   * contactus form submit
   */
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validationform(formData);
    setFormerror(errors);
    if (Object.keys(errors).length > 0) return;

    const response = await axiosClientServiceApi.post(
      `/api/contactus/updateContactDetails`,
      {
        ...formData,
      },
    );
    if (response.status === 200) {
      toast("Your request is submit succuessfully");
      setMesg(response.data.message);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 4000);
      removeCookie("clientInformation");
      setCookie("clientInformation", formData.email, { maxAge: 86400 });
      setFormData(formObject);
      setFormerror("");
    } else {
      setMesg("unable to process your request");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 4000);
    }
  };
  const validationform = (value) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.firstName) {
      errors.firstName = "Please Enter Name";
    }

    if (!value.phone) {
      errors.phone = "Please Enter Phone Number";
    }

    if (!value.email) {
      errors.email = "Please Enter Email";
    } else if (!emailPattern.test(value.email)) {
      errors.email = "Enter Valid Email";
    }

    return errors;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <img src={contactImg} alt="Quick Contact" className="w-100" />
        </div>
      </div>

      {/* Introduction */}
      <div className="row py-3 introGrayBg">
        <div className="col-md-8 offset-md-2 py-4">
          <Title
            title="Share your views"
            cssClass="mb-2 fw-normal fs-2 text-center green-700"
          />
          <p className="text-center lh-md">
            We believe that construction is a man made wonder. The thought of
            bringing imagination to real life structures excites us, each day
            the passion in us grows as we contribute to this industry.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 text-white d-flex justify-content-start align-items-start blueBg-500 p-5">
          <div className="address`">
            <Title title="Address" cssClass="" />
            <Title
              title="We’d Love to Hear From You, Get In Touch With Us!"
              cssClass="fs-6 mb-4"
            />
            <p className="mb-5">
              101, Silicon Towers, <br />
              Image Garden Road, <br />
              Madhapur, <br />
              Hyderabad - 500081
            </p>

            <Title title="Phone Number" cssClass="" />
            <p>40-40036841</p>

            <Title title="Email Id" cssClass="" />
            <p>
              <a
                href="mailto:contact@hprinfraprojects.com"
                className="fs-6 text-white"
              >
                {" "}
                contact@hprinfraprojects.com
              </a>
            </p>
          </div>
        </div>

        <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
          {show && (
            <Alert
              mesg={mesg}
              cssClass={`alert text-white w-75 mt-3 p-2 text-center ${
                mesg === "Success" ? "bg-success" : "bg-danger"
              }`}
            />
          )}
          <form
            className="my-2 py-0 py-md-5 contactForm"
            onSubmit={onFormSubmit}
          >
            <Title title="Quick contact" cssClass="text-black fw-bold mb-4" />

            <div className="mb-3 row">
              <label
                htmlFor="exampleInputFName"
                className="col-sm-2 col-form-label"
              >
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="textbox"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputFName"
                  aria-describedby="emailHelp"
                />

                {formerror.firstName !== null ? (
                  <div id="emailHelp" className="form-text text-danger">
                    {formerror.firstName}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="exampleInputEmail1"
                className="col-sm-2 col-form-label"
              >
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                {formerror.email !== null ? (
                  <div id="emailHelp" className="form-text text-danger">
                    {formerror.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="exampleInputPhone"
                className="col-sm-2 col-form-label"
              >
                Phone
              </label>
              <div className="col-sm-10">
                <input
                  type="textbox"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPhone"
                  aria-describedby="emailHelp"
                />
                {formerror.phone !== null ? (
                  <div id="emailHelp" className="form-text text-danger">
                    {formerror.phone}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="exampleFormMesg"
                className="col-sm-2 col-form-label"
              >
                Message
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  name="message"
                  id="exampleFormMesg"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-2"></div>
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary w-100 text-uppercase py-2"
                >
                  Send Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <iframe
            className="googlemap"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202"
            height="450"
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default Contact;
