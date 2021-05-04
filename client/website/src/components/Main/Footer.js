/**
 * Renders the responsive Footer component for the general website. Footer is coded to always exist at the end of
 * the page, regardless of how much content exists within the page. This constraint can be seen in PageLayout.js for
 * further information, or when the the height of the Footer is updated in the future.
 *
 * This component has no dependencies (aside from constraint in PageLayout.js), and works independently.
 *
 * @author Amrit Kaur Singh
 */
import React, {useEffect, useState} from "react";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import Brand from "./Brand";
import { SITE_PAGES } from "../../constants/links";
import "../../css/Footer.css";

export default function Footer() {

    const MAX_MOBILE_VIEW_WIDTH = 750;

    const [windowSize, setWindowSize] = useState({
        width: undefined
    });

      useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth
          });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }, []); // Empty array ensures that effect is only run on mount

    if(windowSize.width > MAX_MOBILE_VIEW_WIDTH){
        
        return (
            // outer relative div is needed so navbar can function properly
            <div style={{position: "relative"}}>
                <div className="Footer-Main-Container">
                    {/* all linked pages in website  */}
                    <section className="Footer-Pages">
                        <a href={SITE_PAGES.HOME}> Home </a>
                        <a href={SITE_PAGES.CONFERENCES}> Conferences </a>
                        <a href={SITE_PAGES.RESOURCES_LANDING}> Resouces </a>
                        <a href={SITE_PAGES.ABOUT_US}> About Us </a>
                        <a href={SITE_PAGES.CONTACT_US}> Contact Us </a>
                    </section>
                    <section className="Footer-Bottom">
                        {/* social media icons + links */}
                        <section className="Footer-Social-Media">
                            {/* facebook */}
                            <a href="https://www.facebook.com/">
                                <AiOutlineFacebook
                                    style={{ color: "white", borderRadius: "100px" }}
                                    onMouseOut={({ target }) => {
                                        target.style.color = "white";
                                    }}
                                    onMouseOver={({ target }) => {
                                        target.style.color = "#EA8644";
                                    }}
                                />
                            </a>
                            {/* instagram */}
                            <a href="https://www.instagram.com/">
                                <AiOutlineInstagram
                                    style={{ color: "white" }}
                                    onMouseOut={({ target }) => {
                                        target.style.color = "white";
                                    }}
                                    onMouseOver={({ target }) => {
                                        target.style.color = "#EA8644";
                                    }}
                                />
                            </a>
                        </section>
                        {/* site logo */}
                        <Brand location="footer"/>
                    </section>
                </div>
            </div>
        );

    } else{

        return (
    
            // outer relative div is needed so navbar can function properly
            <div style={{position: "relative"}}>
                <div className="Footer-Main-Container">
                    <section className="Footer-Bottom">

                         {/* all linked pages in website  */}
                        <section className="Footer-Pages">
                            <a href={SITE_PAGES.HOME}> Home </a>
                            <a href={SITE_PAGES.CONFERENCES}> Conferences </a>
                            <a href={SITE_PAGES.RESOURCES_LANDING}> Resouces </a>
                            <a href={SITE_PAGES.ABOUT_US}> About Us </a>
                            <a href={SITE_PAGES.CONTACT_US}> Contact Us </a>
                        </section>

                        {/* social media icons + links */}
                        <section className="Footer-Social-Media">
                            {/* facebook */}
                            <a href="https://www.facebook.com/">
                                <AiOutlineFacebook
                                    style={{ color: "white", borderRadius: "100px" }}
                                    onMouseOut={({ target }) => {
                                        target.style.color = "white";
                                    }}
                                    onMouseOver={({ target }) => {
                                        target.style.color = "#EA8644";
                                    }}
                                />
                            </a>
                            {/* instagram */}
                            <a href="https://www.instagram.com/">
                                <AiOutlineInstagram
                                    style={{ color: "white" }}
                                    onMouseOut={({ target }) => {
                                        target.style.color = "white";
                                    }}
                                    onMouseOver={({ target }) => {
                                        target.style.color = "#EA8644";
                                    }}
                                />
                            </a>
                        </section>
                    </section>
                     {/* site logo */}
                     <Brand location="footer"/>
                </div>
            </div>
        );

    }
}
