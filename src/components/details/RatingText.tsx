import React from "react";
import styles from "./RatingText.module.scss";
import Rating from "react-rating";
import { ReactComponent as StarEmpty } from "./icon-star-empty.svg";
import { ReactComponent as StarFull } from "./icon-star-full.svg";

type RatingTextProps = {
  className?: string;
  rating?: number;
  readonly: boolean;
  scale: number;
  label: string;
  onRated?: (rating: number) => void;
};

const RatingText: React.FC<RatingTextProps> = props => {
  return (
    <div className={[styles.RatingText, props.className].join(" ")}>
      <label className={styles.label}>{props.label}</label>
      <Rating
        className={styles.rating}
        initialRating={props.rating ? props.rating / 2 : undefined}
        readonly={props.readonly}
        emptySymbol={<StarEmpty className={styles.star} />}
        fullSymbol={<StarFull className={styles.star} />}
        fractions={2}
        stop={props.scale / 2}
        onChange={(rate: number) => {
          props.onRated && props.onRated(rate * 2);
        }}
      />
      <span className={styles.text}>
        <b>{props.rating}</b>/{props.scale}
      </span>
    </div>
  );
};

export default RatingText;
