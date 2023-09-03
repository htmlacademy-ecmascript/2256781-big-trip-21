import { FilterType } from '../const';
import { isPointPast } from './point';
import { isPointPresent } from './point';
import { isPointFuture } from './point';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
};

export { filter };
