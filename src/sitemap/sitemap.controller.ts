import { Controller, Get, Header } from '@nestjs/common';
import { TopPageService } from '../top-page/top-page.service';
import { ConfigService } from '@nestjs/config';
import { Builder } from 'xml2js';
import { format, subDays } from 'date-fns';
import { CATEGORY_ROUTE } from './constants';

@Controller('sitemap')
export class SitemapController {
  domain: string;

  constructor(
    private readonly topPageService: TopPageService,
    private readonly configService: ConfigService,
  ) {
    this.domain = this.configService.get('DOMAIN') ?? '';
  }

  @Get('xml')
  @Header('Content-Type', 'text/xml')
  async sitemap() {
    const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
    let res = [
      {
        loc: this.domain,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
      {
        loc: `${this.domain}/courses`,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
    ];
    const pages = await this.topPageService.findAll();
    res = res.concat(
      pages.map((page) => {
        return {
          loc: `${this.domain}/${CATEGORY_ROUTE[page.firstCategory]}/${page.alias}`,
          lastmod: format(subDays(new Date(), 1), formatString),
          changefreq: 'weekly',
          priority: '0.8',
        };
      }),
    );
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });
    return builder.buildObject({
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
        url: res,
      },
    });
  }
}
