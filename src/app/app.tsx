import { CardProduct } from '@/components/organisms/card-product';
import { InfiniteScroll, MainLayout, SearchInput } from '@/components/shared';
import { useProducts } from '@/hooks';
import { Products } from '@/interfaces';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './app.module.css';

const App = (): JSX.Element => {
  const { search } = useLocation();
  const querySearch = new URLSearchParams(search)?.get('search');

  const { data, isFetching, fetchNextPage, hasNextPage } = useProducts({
    search: String(querySearch || ''),
  });

  const dataProducts = useMemo(() => {
    if (data?.pages) {
      const newData = data?.pages?.reduce(
        (newArray: any, item: any) => [...newArray, ...item.products],
        []
      );

      return newData;
    }
    return [];
  }, [data?.pages]) as Products[];

  return (
    <MainLayout>
      <section className={styles.features}>
        <div className={styles.searchInput}>
          <SearchInput defaultValue={String(querySearch)} />
        </div>
        {!isFetching && dataProducts?.length <= 0 && (
          <div className="text-gray-400">No data found</div>
        )}
        <InfiniteScroll
          loader={<p>loading...</p>}
          isLoading={isFetching}
          className="my-10"
          fetchMore={fetchNextPage}
          hasMore={hasNextPage}
          endMessage={<p>You have seen it all</p>}
        >
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
        </InfiniteScroll>
      </section>
    </MainLayout>
  );
};

export default App;
