import CopyButton from '@/components/molecules/copy-button';
import {
  Bars3Icon,
  BeakerIcon,
  BookmarkIcon,
  CakeIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  FilmIcon,
  LockClosedIcon,
  PencilIcon,
  PhoneXMarkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import styles from './app.module.css';
import { CardProduct } from '@/components/organisms/card-product';
import { MainLayout, SearchInput } from '@/components/shared';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useProducts } from '@/hooks';
import { Products } from '@/interfaces';

const features = [
  {
    name: 'Vite',
    description: 'Faster and leaner development experience for modern web projects.',
    logo: CubeTransparentIcon,
    docs: 'https://vitejs.dev/',
  },
  {
    name: 'React',
    description: 'JavaScript library for building user interfaces.',
    logo: PencilIcon,
    docs: 'https://reactjs.org/',
  },
  {
    name: 'TypeScript',
    description: 'Strongly typed programming language that builds on JavaScript.',
    logo: BookmarkIcon,
    docs: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Tailwind with JIT',
    description: 'A utility-first CSS framework packed with classes.',
    logo: PhotoIcon,
    docs: 'https://tailwindcss.com/',
  },
  {
    name: 'Jest',
    description: 'Testing Framework with a focus on simplicity.',
    logo: QuestionMarkCircleIcon,
    docs: 'https://jestjs.io/',
  },
  {
    name: 'CSS Modules',
    description:
      'CSS file in which all class names and animation names are scoped locally by default.',
    logo: LockClosedIcon,
    docs: 'https://github.com/css-modules/css-modules',
  },
  {
    name: 'ESLint',
    description: 'Find and fix problems in your JavaScript code.',
    logo: BeakerIcon,
    docs: 'https://eslint.org/',
  },
  {
    name: 'Prettier',
    description: 'An opinionated code formatter.',
    logo: Bars3Icon,
    docs: 'https://prettier.io/',
  },
  {
    name: 'Husky',
    description: 'Lint your commit messages, run tests, lint code, etc... when you commit or push.',
    logo: CakeIcon,
    docs: 'https://github.com/typicode/husky',
  },
  {
    name: 'Commit-lint',
    description: 'Helps your team adhering to a commit convention.',
    logo: FilmIcon,
    docs: 'https://github.com/conventional-changelog/commitlint',
  },
  {
    name: 'Atomic design',
    description: 'We’re not designing pages, we’re designing systems of components.',
    logo: PhoneXMarkIcon,
    docs: 'https://bradfrost.com/blog/post/atomic-web-design/',
  },
  {
    name: 'Absolute imports',
    description: 'Import resource using its full path from the project’s src folder.',
    logo: ChevronDownIcon,
    docs: 'https://github.com/vitejs/vite/issues/88#issuecomment-762415200',
  },
];

const App = (): JSX.Element => {
  const { search } = useLocation();
  const querySearch = new URLSearchParams(search)?.get('search');

  const { data, isFetching, fetchNextPage, hasNextPage } = useProducts({
    search: String(querySearch || ''),
  });

  const dataProducts: Products[] = useMemo(() => {
    if (data?.pages) {
      const newData = data?.pages?.reduce(
        (newArray: any, item: any) => [...newArray, ...item.products],
        []
      );

      return newData;
    }
    return [];
  }, [data?.pages]) as [];

  return (
    <MainLayout>
      <section className={styles.features}>
        <div className={styles.searchInput}>
          <SearchInput defaultValue={String(querySearch)} />
        </div>
        <div>
          {dataProducts?.map((product: Products, _) => (
            <div key={`${product.id} - ${_}`} className={styles.cardWrapper}>
              <CardProduct
                title={product?.title}
                price={product?.price}
                description={product?.description}
                href={product?.thumbnail}
              />
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default App;
