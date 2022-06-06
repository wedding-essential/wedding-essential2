import { Avatar } from "@material-ui/core";
import React from "react";
import WeddingTimeline from "../../public/components/wedding/WeddingTimeline";
import SpeedDialAvatar from "../../public/components/wedding/SpeedDialAvatar";

const mockEvents = [{ date: Date.now() }];

export default function weddingHome() {
  return (
    <div className="wedding-home-page bg-default">
      <header className="bg-wedding wedding-header">
        <SpeedDialAvatar avatarImage="mockCoupleAvatar.png" />
      </header>
      <main className="grid-container grid-container--wedding-home">
        <section className="flow" id="story">
          <h2 className="ff-serif ff-500 text-gold letter-spacing-2 uppercase">
            Our Story
          </h2>
          <p className="ff-sans ff-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, mollitia. Veritatis recusandae unde sequi fugiat odit
            fuga! Repellendus voluptas fugit nihil ea aut, obcaecati iusto natus
            eius reprehenderit labore quisquam!
          </p>
        </section>
        <section className="flow" id="timeline">
          <h2 className="ff-serif ff-500 text-gold letter-spacing-2 uppercase">
            Timeline
          </h2>
          <WeddingTimeline events={[]} />
        </section>
        <section className="flow" id="rsvp">
          <h2 className="ff-serif ff-500 text-gold letter-spacing-2 uppercase">
            RSVP
          </h2>
          <div className="rsvp-list flex ff-sans ">
            <div className="text-align-center flow">
              <span className="button small-button ff-serif">0</span>
              <span className="d-block">invited</span>
            </div>
            <div className="text-align-center flow">
              <span className="button small-button ff-serif">0</span>
              <span className="d-block">Yes</span>
            </div>
            <div className="text-align-center flow">
              <span className="button small-button ff-serif">0</span>
              <span className="d-block">No</span>
            </div>
            <div className="text-align-center flow">
              <span className="button small-button ff-serif">0</span>
              <span className="d-block">Maybe</span>
            </div>
          </div>
        </section>
        <section className="flow" id="dresscode">
          <h2 className="ff-serif ff-500 text-gold letter-spacing-2 uppercase">
            Dresscode
          </h2>
          <p className="ff-sans ff-200">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia,
            dicta quibusdam accusamus error nemo beatae, nostrum dolorum dolores
            dignissimos iusto commodi. Architecto voluptatem sunt corporis rem,
            nostrum iusto velit. Consequatur.
          </p>
        </section>
        <section className="flow" id="witnesses">
          <h2 className="ff-serif ff-500 text-gold letter-spacing-2 uppercase">
            Witnesses
          </h2>
          <p className="ff-sans ff-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quam
            et ratione ut veritatis vitae necessitatibus sed rerum non sapiente
            doloremque, dolorum deserunt rem? Iusto excepturi quisquam autem
            odio cupiditate.
          </p>
        </section>
      </main>
    </div>
  );
}
