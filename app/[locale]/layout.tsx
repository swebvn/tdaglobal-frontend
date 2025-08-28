import type { Metadata } from "next";
import "../globals.css";
import "../nest-hub-fix.css";
import { Providers } from "./providers";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import IntlHeader from "@/components/intl-header";
import ScrollToTop from "@/components/scroll-to-top";
import BackToTop from "@/components/back-to-top";
import StructuredData from "@/components/structured-data";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  
  const titles = {
    en: "TDA Global - Connect Vietnamese Products with Global Markets",
    vi: "TDA Global - Kết nối sản phẩm Việt Nam với thị trường toàn cầu"
  };
  
  const descriptions = {
    en: "TDA Global brings precision, creativity, and clarity to global eCommerce. From product design to order fulfillment, we connect Vietnamese products with global markets.",
    vi: "TDA Global mang đến sự chính xác, sáng tạo và rõ ràng cho thương mại điện tử toàn cầu. Từ thiết kế sản phẩm đến thực hiện đơn hàng, chúng tôi kết nối sản phẩm Việt Nam với thị trường toàn cầu."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en": "/en",
        "vi": "/vi",
      },
    },
    openGraph: {
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <StructuredData locale={locale} />
        <ScrollToTop />
        <IntlHeader />
        <main 
          className="pt-16 xs:pt-16 sm:pt-18 md:pt-20 lg:pt-24 xl:pt-28 nest-hub:pt-25"
          style={{
            paddingTop: 'clamp(64px, 10vw, 112px)'
          }}
        >
          {children}
        </main>
        <BackToTop />
      </Providers>
    </NextIntlClientProvider>
  );
}
