import React from "react";
import styles from "./Thumbnail.module.scss";

type ThumbnailProps = {
  title: string;
  posterUrl?: string;
  onClick?: () => void;
  selected: boolean;
};

const Thumbnail = React.forwardRef<HTMLDivElement, ThumbnailProps>(
  function Thumbnail(props, ref) {
    const { title, selected, posterUrl } = props;

    return (
      <div
        ref={ref}
        onClick={() => props.onClick && props.onClick()}
        className={[
          styles.MovieItem,
          selected ? styles.selected : undefined
        ].join(" ")}
      >
        <img
          crossOrigin=""
          alt={title}
          className={styles.poster}
          src={posterUrl}
        />
        <div className={styles.title}>{title}</div>
      </div>
    );
  }
);

export default Thumbnail;
