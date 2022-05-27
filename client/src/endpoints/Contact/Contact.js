import React, { useState } from "react";
function Contact() {
  const [submittedContact, setSubmittedContact] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setSubmittedContact(true);
    const data = { name: name, message: message, email: email };
    console.log('before')
    const endpoint = process.env.REACT_APP_BACKEND_URL.replaceAll(
      '"',
      ""
    ).replaceAll(";", "")
      console.log('second replaceall')
    console.log(endpoint)
    const url = `${endpoint}/sendmail` //change when gets depoloyed to production
    const response = fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    response.then((result) => {
      return result.json();
    });
  };
  return (
    <div id='contact'>
      <h1>Contact Us</h1>
      <form className="contactForm">
        <fieldset>
          <label htmlFor="name">Name:</label>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            name="message"
            placeholder="Your Message"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </fieldset>
        <button onClick={handleContactSubmit}>SUBMIT</button>
      </form>
    </div>
  );
}

export default Contact;
