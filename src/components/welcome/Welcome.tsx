import React from "react";
import styles from "./Welcome.module.scss";
import MayTheForce from "./undraw_may_the_force.svg";

type WelcomeProps = {
  currentUrl: string;
  requestToken?: string;
  sessionId?: string;
  accountId?: string;
};

const Welcome: React.FC<WelcomeProps> = props => (
  <div className={styles.Welcome}>
    <img
      src={MayTheForce}
      className={styles.mayTheForce}
      alt="May the force be with you !"
    />
    <div className={styles.content}>
      <h1>Join the force !</h1>
      <aside>
        Latest news from your theaters at a glance ! Join MovieStar now,
        it&apos;s just one step and it&apos;s free.
      </aside>
      <form
        action={`https://www.themoviedb.org/authenticate/${props.requestToken}`}
      >
        <input
          disabled={!props.requestToken || !!props.sessionId}
          type="submit"
          value="Login with the MovieDB"
        />
        <input type="hidden" name="redirect_to" value={props.currentUrl} />
      </form>
    </div>
  </div>
);

export default Welcome;
