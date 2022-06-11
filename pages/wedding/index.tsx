import React from "react";
import WeddingTimeline from "../../public/components/wedding/WeddingTimeline";
import SpeedDialAvatar from "../../public/components/wedding/SpeedDialAvatar";
import { mockEvents } from "../../mocks/mockEvents";
import { mockWeddings } from "../../mocks/mockWeddings";
import { mockRSVP } from "../../mocks/mockRSVP";
import { RSVP_STATUS } from "../../constants";

const thisWedding = mockWeddings[0];

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
          <p className="ff-sans ff-200">{thisWedding.story}</p>
        </section>
        <section className="flow timeline" id="timeline">
          <h2 className="ff-serif ff-500 text-gold letter-spacing-2 uppercase">
            Timeline
          </h2>
          <WeddingTimeline events={mockEvents} />
        </section>
        <section className="flow" id="rsvp">
          <h2 className="ff-serif ff-500 text-gold letter-spacing-2 uppercase">
            RSVP
          </h2>
          <div className="rsvp-list flex ff-sans ">
            <div className="text-align-center flow">
              <span className="button small-button ff-sans fs-500">
                {mockRSVP.length}
              </span>
              <span className="d-block fs-400">invited</span>
            </div>
            <div className="text-align-center flow">
              <span className="button small-button ff-sans fs-500">
                {
                  mockRSVP.filter((rsvp) => rsvp.status === RSVP_STATUS.YES)
                    .length
                }
              </span>
              <span className="d-block fs-400">Yes</span>
            </div>
            <div className="text-align-center flow">
              <span className="button small-button ff-sans fs-500">
                {
                  mockRSVP.filter((rsvp) => rsvp.status === RSVP_STATUS.NO)
                    .length
                }
              </span>
              <span className="d-block fs-400">No</span>
            </div>
            <div className="text-align-center flow">
              <span className="button small-button ff-sans fs-500">
                {
                  mockRSVP.filter((rsvp) => rsvp.status === RSVP_STATUS.MAYBE)
                    .length
                }
              </span>
              <span className="d-block fs-400">Maybe</span>
            </div>
          </div>
        </section>
        <section className="flow" id="dresscode">
          <h2 className="ff-serif ff-500 text-gold letter-spacing-2 uppercase">
            Dresscode
          </h2>
          <p className="ff-sans ff-200">{thisWedding.dresscode}</p>
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
