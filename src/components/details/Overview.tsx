import React from "react";
import styles from "./Overview.module.scss";
import RatingText from "./RatingText";

type OverviewProps = {
  title: string;
  posterUrl?: string;
  directors?: string[];
  genres?: string[];
  rating?: number;
  totalRatings?: number;
  userRating?: number;
  synopsis?: string;
  inWatchlist?: boolean;
  onAddToWatchlist?: () => void;
  onRemoveFromWatchlist?: () => void;
  onRating?: (rating: number) => void;
};

const Overview: React.FC<OverviewProps> = props => {
  const {
    genres,
    directors,
    title,
    posterUrl,
    synopsis,
    inWatchlist,
    onAddToWatchlist,
    onRemoveFromWatchlist,
    onRating
  } = props;

  return (
    <div className={styles.Overview}>
      <div className={styles.columnLeft}>
        <img
          crossOrigin=""
          alt={props.title}
          className={styles.poster}
          src={posterUrl}
        />
      </div>
      <div>
        {genres && <div className={styles.genres}>{genres.join(", ")}</div>}
        <h2 className={styles.title}>{title}</h2>
        {directors && (
          <div className={styles.directors}>
            Directed by {directors.join(", ")}
          </div>
        )}
        <div className={styles.ratings}>
          {!!props.totalRatings && props.totalRatings > 0 && (
            <RatingText
              className={styles.rating}
              label="Rating"
              readonly={true}
              rating={props.rating}
              scale={10}
            />
          )}

          <RatingText
            className={styles.rating}
            label="Your rating"
            readonly={false}
            rating={props.userRating}
            scale={10}
            onRated={(rate: number) => onRating && onRating(rate)}
          />
        </div>
        {synopsis && <p className={styles.synopsis}>{synopsis}</p>}
        {inWatchlist === false && (
          <button
            className={styles.addToWatchlist}
            onClick={() => onAddToWatchlist && onAddToWatchlist()}
          >
            Add to watchlist
          </button>
        )}
        {inWatchlist === true && (
          <button
            className={styles.addToWatchlist}
            onClick={() => onRemoveFromWatchlist && onRemoveFromWatchlist()}
          >
            Remove from watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default Overview;
