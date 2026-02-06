function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <p className="contact-text">
          I'm always open to new opportunities and interesting projects. Whether
          you have a question or just want to say hello, feel free to reach out.
        </p>
        <div className="contact-links">
          <a
            href="https://github.com/andimrob"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            GitHub
          </a>
          <a href="mailto:hello@andimrob.com" className="btn btn-outline">
            Email Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
