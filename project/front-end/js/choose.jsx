import backgroundImageWithOverlay from "./background-image-with-overlay.png";
import icon2 from "./icon-2.svg";
import icon from "./icon.svg";
import image from "./image.svg";
import microbioHero1 from "./microbio-hero-1.png";
import "./css/choose.css";

export const Body = () => {
  return (
    <div className="body">
      <div className="main">
        <div className="div">
          <img
            className="background-image"
            alt="Background image"
            src={backgroundImageWithOverlay}
          />

          <div className="overlay" />

          <div className="decorative-organic" />

          <div className="content">
            <div className="heading">
              <div className="text">Agronegócio</div>
            </div>

            <div className="container">
              <p className="text-wrapper">
                Soluções biológicas inovadoras para
                <br />
                aumentar a produtividade e saúde do seu
                <br />
                solo de forma sustentável.
              </p>
            </div>

            <div className="background">
              <div className="overlay-shadow" />

              <div className="text-2">Acessar Plataforma Agro</div>

              <div className="icon-wrapper">
                <img className="icon" alt="Icon" src={icon} />
              </div>
            </div>
          </div>
        </div>

        <div className="div">
          <div className="overlay-2" />

          <div className="content-2">
            <img
              className="microbio-hero"
              alt="Microbio hero"
              src={microbioHero1}
            />

            <div className="heading">
              <div className="text-wrapper-2">Saúde</div>
            </div>

            <div className="div-wrapper">
              <p className="p">
                Ciência avançada em análises
                <br />
                laboratoriais e diagnósticos moleculares
                <br />
                para precisão clínica.
              </p>
            </div>

            <div className="background-2">
              <div className="overlay-shadow" />

              <div className="text-3">Acessar Portal Saúde</div>

              <div className="icon-wrapper">
                <img className="icon" alt="Icon" src={image} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="center-badge-the">
        <div className="background-3">
          <div className="overlay-shadow-2" />

          <div className="img-wrapper">
            <img className="img" alt="Icon" src={icon2} />
          </div>
        </div>

        <div className="margin">
          <div className="background-border">
            <div className="overlay-shadow-3" />

            <div className="text-4">SELECIONE</div>
          </div>
        </div>
      </div>

      <div className="header-top">
        <div className="overlay-border">
          <div className="overlay-shadow-3" />

          <div className="text-5">MicroBio</div>
        </div>
      </div>

      <div className="footer-information">
        <div className="overlay-border-2">
          <div className="text-wrapper-3">© 2026 MicroBio.</div>
        </div>
      </div>
    </div>
  );
};