"use client";

import * as Styles from "./HomeView.styles";

interface HomeViewProps {
  stats: {
    tierCount: number;
    specialCoatCount: number;
    habitatCount: number;
  };
  t: any;
}

export default function HomeView({ stats, t }: HomeViewProps) {
  return (
    <Styles.FullPageContainer>
      <Styles.HeroSection>
        <Styles.ContentWrapper>
          <h1>
            Zoo 2: Animal Park <span>Manager</span>
          </h1>

          <Styles.StatsBar>
            <Styles.StatItem>
              <div className="number">{stats.tierCount}</div>
              <div className="label">{t.stats_animals}</div>
            </Styles.StatItem>
            <Styles.StatItem>
              <div className="number">{stats.specialCoatCount}</div>
              <div className="label">{t.stats_specialCoat}</div>
            </Styles.StatItem>
            <Styles.StatItem>
              <div className="number">{stats.habitatCount}</div>
              <div className="label">{t.stats_biomes}</div>
            </Styles.StatItem>
            <Styles.StatItem>
              <div className="number">6</div>
              <div className="label">{t.stats_regions}</div>
            </Styles.StatItem>
          </Styles.StatsBar>

          <Styles.ActionGrid>
            <Styles.MenuCard href="/AnimalOverview" $color="#4ca64c">
              <Styles.Icon>🐾</Styles.Icon>
              <h3>{t.cards_lexicon_title}</h3>
              <p>{t.cards_lexicon_text}</p>
            </Styles.MenuCard>

            <Styles.MenuCard href="/varianten" $color="#3498db">
              <Styles.Icon>🎨</Styles.Icon>
              <h3>{t.cards_specialCoat_title}</h3>
              <p>{t.cards_specialCoat_text}</p>
            </Styles.MenuCard>

            <Styles.MenuCard href="/klub" $color="#f39c12">
              <Styles.Icon>🏆</Styles.Icon>
              <h3>{t.cards_club_title}</h3>
              <p>{t.cards_club_text}</p>
            </Styles.MenuCard>
          </Styles.ActionGrid>
        </Styles.ContentWrapper>
      </Styles.HeroSection>
    </Styles.FullPageContainer>
  );
}
