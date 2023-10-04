const getBriefTemplate = ({ destinationChain, duration, bottomLine }) =>
  `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinationChain}</h1>

      <p class="trip-info__dates">${duration}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${bottomLine}</span>
    </p>
  </section>`;

export { getBriefTemplate };
