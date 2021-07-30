import IndexedBufferGeometryAdapter from './IndexedBufferGeometryAdapter.js';
import UnIndexedBufferGeometryAdapter from './UnindexedBufferGeometryAdapter.js';
import GeometryAdapter from './GeometryAdapter.js';

export default class GeometryAdapterFactory {

    getAdapter(geometry) {
        const hasPositionAtrr = geometry.attributes && geometry.attributes.position;

        if (hasPositionAtrr) {
            if (geometry.index) {
                return new IndexedBufferGeometryAdapter(geometry);
            } else {
                return new UnIndexedBufferGeometryAdapter(geometry);
            }
        } else {
            return new GeometryAdapter(geometry);
        }
    }
}