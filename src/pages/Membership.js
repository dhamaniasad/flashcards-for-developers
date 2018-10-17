import React from "react";
import Modal from "react-modal";
import cx from "classnames";
import cookie from "js-cookie";

import * as analytics from "../components/GoogleAnalytics";
import * as api from "../app/apiActions";
import isAuthenticated from "../app/utils/isAuthenticated";
import Octicon from "../components/Octicon";

const CheckMark = () => <i className="fas fa-check fa-lg" />;

const UpgradeLink = ({ onOpenModal }) => (
  <button
    className="btn btn-dark font-weight-medium"
    onClick={onOpenModal}
    style={{ fontSize: "1.25em", borderRadius: "999px", padding: "5px 50px" }}
  >
    Upgrade
  </button>
);

const TableTop = () => (
  <div className="row mb-2">
    <div className="col-4">
      <h2 className="m-0">Pricing</h2>
    </div>
    <div className="col-8">
      <div className="row">
        <div className="col-6">
          <div className="text-center text-uppercase font-weight-medium">Basic</div>
        </div>
        <div className="col-6">
          <div className="text-center text-uppercase font-weight-medium pr-2">
            <span role="img" aria-label="emoji">
              🎉
            </span>{" "}
            Pro
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TableHeader = ({ tier1, tier2, tier3 }) => (
  <div className="row">
    <div className="col-4" />
    <div className="col-8">
      <div className="row">
        <div className="col-6 text-center">
          <div className="py-1 pt-5 px-2 bg-grayLight rounded-huge-top">
            <div className="text-large">{tier1}</div>
            <small className="text-muted">per month</small>
          </div>
        </div>
        <div className="col-6 text-center d-flex flex-column">
          <div className="rounded-huge-top bg-blueDark text-white">
            <small className="text-uppercase rounded-huge-top font-weight-medium">
              Recommended
            </small>
          </div>
          <div className="py-1 pt-3 px-2 bg-blueLight" style={{ flexGrow: 1 }}>
            <div className="text-large">{tier2}</div>
            <small className="text-muted">per month</small>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TableRow = ({ label, tier1, tier2, tier3 }) => (
  <div className="row table-row font-weight-medium">
    <div className="col-4">
      <div className="py-2 text-underline">{label}</div>
    </div>
    <div className="col-8">
      <div className="row">
        <div className="col-6">
          <div className="py-2 px-2 bg-grayLight text-center">
            <span className="font-weight-medium">{tier1}</span>
          </div>
        </div>
        <div className="col-6">
          <div className="py-2 px-2 bg-blueLight text-center" style={{ zIndex: -1 }}>
            <span className="font-weight-medium" style={{ zIndex: 1 }}>
              {tier2}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TableLabel = ({ label }) => (
  <div className="row font-weight-medium" style={{ height: "50px" }}>
    <div className="col-4 d-flex flex-column justify-content-end">
      <div className="py-3 pt-4 text-uppercase text-muted small">{label}</div>
    </div>
    <div className="col-8 d-flex flex-column">
      <div className="row" style={{ flexGrow: 1 }}>
        <div className="col-6 d-flex flex-column">
          <div className="py-2 pt-4 px-2 text-center bg-grayLight" style={{ flexGrow: 1 }} />
        </div>
        <div className="col-6 d-flex flex-column">
          <div className="py-2 pt-4 px-2 bg-blueLight text-center" style={{ flexGrow: 1 }} />
        </div>
      </div>
    </div>
  </div>
);

const TableFooter = ({ onOpenModal }) => (
  <div className="row">
    <div className="col-4" />
    <div className="col-8">
      <div className="row">
        <div className="col-6 d-flex flex-column">
          <div
            className="pt-5 pb-5 px-2 bg-grayLight text-center rounded-huge-bottom"
            style={{ flexGrow: 1 }}
          />
        </div>
        <div className="col-6">
          <div className="pt-5 pb-5 px-2 px bg-blueLight rounded-huge-bottom text-center">
            <UpgradeLink onOpenModal={onOpenModal} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Tier = ({ className, sublabel, price, priceSublabel, features, link }) => (
  <div className={cx("rounded-huge mb-3 p-3", className)}>
    <div className="text-uppercase font-weight-medium small">{sublabel}</div>
    <div className="d-flex align-items-center my-2">
      <div className="text-large">{price}</div>
      <small className="text-muted ml-2">{priceSublabel}</small>
    </div>
    <div className="my-3">{link}</div>
    <div>
      {features.map((el, index) => (
        <div className="font-weight-medium" key={index}>
          {el}
        </div>
      ))}
    </div>
  </div>
);

const ComingSoonModal = ({ isOpen, isSubmitted, onClose, onSubmit, user }) => (
  <Modal isOpen={isOpen} className="comingSoonModal" overlayClassName="comingSoonModal-overlay">
    <button className="loginModal-close btn btn-reset p-2" onClick={onClose}>
      <Octicon name="x" />
    </button>
    <div className="py-5 px-4 my-2 mx-auto" style={{ maxWidth: "430px" }}>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <div className="text-center mx-auto">
            <h5 className="mb-1">
              <span role="img" aria-label="emoji">
                🎉
              </span>{" "}
              Pro memberships coming soon!
            </h5>
            <p className="text-secondary font-weight-light">
              Leave your email here. We will let you know when pro memberships are live.
            </p>
          </div>

          <div className="input-group">
            <input
              className="form-control"
              placeholder="Enter your email..."
              defaultValue={user.email}
            />
            <button
              className="btn btn-dark"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              type="submit"
            >
              <small>GET NOTIFIED</small>
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center mx-auto">
          <h5 className="mb-1">
            <span role="img" aria-label="emoji">
              ✅
            </span>{" "}
            Thanks for subscribing!
          </h5>
          <p className="text-secondary font-weight-light">
            We will email you shortly when memberships are ready for showtime. If you have any
            questions, <a href="mailto:hello@flashcardsfordevelopers.com">contact us</a>.
          </p>
        </div>
      )}
    </div>
  </Modal>
);

class Membership extends React.Component {
  state = { showModal: false, isSubmitted: false };

  onOpenModal = () => {
    analytics.logMembershipAction("Click 'Upgrade' button");
    this.setState({ showModal: true });
  };

  onCloseModal = () => {
    if (!this.state.isSubmitted) {
      analytics.logMembershipAction("Closed 'Upgrade' modal");
    }
    this.setState({ showModal: false });
  };

  onSubmitModal = event => {
    event.preventDefault();
    const { value } = event.target.querySelector("input");

    api
      .subscribeUser(value)
      .then(response => {
        analytics.logMembershipAction("Submitted 'Upgrade' email");
        this.setState({ isSubmitted: true });
      })
      .catch(error => {
        analytics.logMembershipAction("Error on subscription");
        this.setState({ showModal: false });
      });
  };

  render() {
    const authenticated = isAuthenticated();
    const user = authenticated ? JSON.parse(cookie.get("user")) : {};

    return (
      <div className="container container--full py-5">
        <ComingSoonModal
          isOpen={this.state.showModal}
          isSubmitted={this.state.isSubmitted}
          onClose={this.onCloseModal}
          onSubmit={this.onSubmitModal}
          user={user}
        />
        <div className="px-md-5 row">
          <div className="col-12">
            <h1 className="font-weight-bold m-0" style={{ fontSize: "40px" }}>
              LEARN SMARTER, NOT HARDER
            </h1>
            <p
              className="text-muted font-weight-light"
              style={{ fontSize: "24px", maxWidth: "600px", lineHeight: "1.2em" }}
            >
              Be part of the new way of learning. Become a member of Flashcards for Developers for
              <span className="font-weight-medium"> $6/month</span>.
            </p>
          </div>
        </div>

        <div className="px-md-5 mt-5 d-none d-md-block">
          <TableTop />
          <TableHeader tier1="$0" tier2="$6" tier3="✨" />
          <TableLabel label="Usage" />
          <TableRow
            label="Spaced repetition"
            tier1={<CheckMark />}
            tier2={<CheckMark />}
            tier3={<CheckMark />}
          />
          <TableRow label="Pinned decks" tier1="10" tier2="100" tier3="Increased" />
          <TableRow
            label="Review history"
            tier1="3 months"
            tier2={<CheckMark />}
            tier3={<CheckMark />}
          />
          <TableRow
            label="Create your own decks"
            tier1="-"
            tier2={<CheckMark />}
            tier3={<CheckMark />}
          />
          <TableRow label="Premium decks" tier1="-" tier2={<CheckMark />} tier3={<CheckMark />} />
          <TableFooter onOpenModal={this.onOpenModal} />
        </div>

        <div className="mt-5 d-md-none">
          <Tier
            className="bg-grayLight"
            sublabel="Basic"
            price="$0"
            priceSublabel="per month"
            features={["Spaced repetition", "3 months review history", "10 pinned decks"]}
          />
          <Tier
            className="bg-blueLight"
            sublabel="Pro Member"
            price="$6"
            priceSublabel="per month"
            link={<UpgradeLink onOpenModal={this.onOpenModal} />}
            features={[
              "Spaced repetition",
              "Review history",
              "Create your own decks",
              "Premium content",
            ]}
          />
        </div>

        <div className="row my-5">
          <div className="col-12 mt-5 py-5">
            <div className="text-center text-uppercase text-muted font-weight-medium">
              Frequently Asked Questions
            </div>
            <div className="text-center text-muted font-weight-medium">
              Questions? <a href="mailto:hello@flashcardsfordevelopers.com">Contact us</a>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <h5>What is a deck?</h5>
            <p>
              A deck is a collection of related flashcards. They often represent a single subject
              that you can study. For example, you could study our Big-O notation deck.
            </p>
          </div>
          <div className="col-sm-4 mb-3">
            <h5>What is spaced repetition?</h5>
            <p>
              Flashcards are scheduled at increasing intervals to improve your ability to recall and
              reduce the effort learning them. This technique, called spaced repetition, is a proven
              way to study effectively.
            </p>
          </div>
          <div className="col-sm-4 mb-3">
            <h5>What is review history?</h5>
            <p>
              Your review history is a snapshot of your study activity. You can view a living
              history of your study habits. We provide a limited history for free plans, with
              extended histories for our Pro plan.
            </p>
          </div>
          <div className="col-sm-4 mb-3">
            <h5>What are pinned decks?</h5>
            <p>
              Pinned decks are favorite decks you want to keep studying. They are easier to find and
              can be studied all at once.
            </p>
          </div>
          <div className="col-sm-4 mb-3">
            <h5>What are premium decks?</h5>
            <p>
              Premium decks are collections of pre-made flashcards that are only visible to Pro
              members. These decks contain higher quality custom-made concepts.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Membership;