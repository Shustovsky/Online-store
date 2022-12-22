import { CatalogService } from './catalogService';
import { CatalogView } from './catalogView';

export class CatalogController {
    catalogService: CatalogService = new CatalogService();
    catalogView: CatalogView = new CatalogView();

    drawPage() {
        const catalog = this.catalogService.getCatalog();
        this.catalogView.createCatalog(catalog);
    }
}
