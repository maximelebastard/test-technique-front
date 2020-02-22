import React, { useEffect } from "react";
import styles from "./Grid.module.scss";
import Thumbnail from "../thumbnail/Thumbnail.connected";
import Details from "../details/Details";
import { Movie } from "domain/types";

type GridItemProps = {
  movie: Movie;
  showDetails: boolean;
  onMovieSelected: (movieId?: string) => void;
};

const GridItem: React.FC<GridItemProps> = (props: GridItemProps) => {
  const { movie, showDetails, onMovieSelected } = props;

  const detailsRef = React.createRef<HTMLDivElement>();
  const itemRef = React.createRef<HTMLLIElement>();

  function extendDetails() {
    if (itemRef.current) {
      const paddingBottom =
        showDetails && detailsRef.current
          ? `${detailsRef.current.offsetHeight}px`
          : `10px`;
      itemRef.current.style.paddingBottom = paddingBottom;
    }
  }
  useEffect(extendDetails, [showDetails]);

  return (
    <li className={styles.item} ref={itemRef}>
      <Thumbnail
        movie={movie}
        onClick={() => onMovieSelected(showDetails ? undefined : movie.id)}
      />
      {showDetails && (
        <div className={styles.detailsWrapper}>
          <Details
            ref={detailsRef}
            movie={movie}
            onTabChange={() => extendDetails()}
          />
        </div>
      )}
    </li>
  );
};

export default GridItem;
