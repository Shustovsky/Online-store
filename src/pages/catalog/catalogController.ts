import { CatalogService } from './catalogService';
import { CatalogView } from './catalogView';

export class CatalogController {
    catalogService: CatalogService;
    catalogView: CatalogView;

    constructor(catalogService: CatalogService, catalogView: CatalogView) {
        this.catalogService = catalogService;
        this.catalogView = catalogView;
    }

    drawPage() {
        const catalog = this.catalogService.getCatalog();
        this.catalogView.createCatalog(catalog);
    }
}
