import React, { useEffect } from "react";
import WeddingTimeline from "../../src/components/wedding/WeddingTimeline";
import SpeedDialAvatar from "../../src/components/wedding/SpeedDialAvatar";
import { mockEvents } from "../../mocks/mockEvents";
import { mockWeddings } from "../../mocks/mockWeddings";
import { mockRSVP } from "../../mocks/mockRSVP";
import { RSVP_STATUS } from "../../constants";
import { mockUsers } from "../../mocks/mockUsers";
import Button from "@material-ui/core/Button";
import { signOut } from "../../src/helpers/firebaseAuth";
import protectedRoute from "../../src/helpers/protectedRoute";

const thisWedding = mockWeddings[0];

function weddingHome(): JSX.Element {
  return (
    <div className="page wedding-home-page">
      <header className="bg-wedding wedding-header">
        <Button onClick={signOut}>Logout</Button>
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

          {mockUsers
            .filter((user) => thisWedding.witnesses.includes(user.personaId))
            .map((user) => {
              return (
                <div>
                  <h3>{`${user.firstName} ${user.lastName}`}</h3>
                </div>
              );
            })}
        </section>
      </main>
    </div>
  );
}

export default protectedRoute(weddingHome);
