import React, { useState, useEffect } from "react";
import styles from "./Details.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Movie, MovieDetails } from "domain/types";
import Overview from "./Overview.connected";
import Related from "./Related.connected";

type DetailsProps = {
  movie: Movie;
  movieDetails?: MovieDetails;
  onTabChange?: () => void;
};

const Details = React.forwardRef<HTMLDivElement, DetailsProps>(function Details(
  props,
  ref
) {
  const { movie, onTabChange } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => onTabChange && onTabChange(), [selectedIndex]);

  return (
    <article ref={ref} className={styles.Details}>
      <Tabs
        selectedIndex={selectedIndex}
        onSelect={tabIndex => setSelectedIndex(tabIndex)}
      >
        <TabList className={styles.tabList}>
          <Tab selectedClassName={styles.tabSelected}>Overview</Tab>
          <Tab selectedClassName={styles.tabSelected}>Related Movies</Tab>
        </TabList>

        <TabPanel>
          <Overview movie={movie} />
        </TabPanel>
        <TabPanel>
          <Related movie={movie} />
        </TabPanel>
      </Tabs>
    </article>
  );
});

export default Details;
