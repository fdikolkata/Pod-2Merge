
import {Homepage} from './Homepage';
import {Page} from '@playwright/test';
import {ForDemo} from './DemoQA';

export class POManager
{
    homepage: Homepage;
    forDemo : ForDemo;
    page : Page;


constructor(page:Page)
{
    this.page = page;
    this.homepage = new Homepage(this.page)
    this.forDemo = new ForDemo(this.page)


}

getHomepage()
{
    return this.homepage;
}

getForDemo()
{
    return this.forDemo;
}

}
module.exports = {POManager};