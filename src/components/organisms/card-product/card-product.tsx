import { forwardRef, ComponentProps } from 'react';

import styles from './card-product.module.css';
import { getSymbolCurrency } from '@/utils';
import { LazyImage } from '@/components/shared';

export interface CardProductProps extends Omit<ComponentProps<'div'>, 'className' | 'children'> {
  title: string;
  description: string;
  Icon?: (props: ComponentProps<'svg'>) => JSX.Element;
  href: string;
  price: number;
}

export const CardProduct = forwardRef<HTMLDivElement, CardProductProps>(
  ({ title, description, price, Icon, href, ...rest }, ref) => {
    return (
      <div ref={ref} className={styles.card} {...rest}>
        <LazyImage
          classImageWrapper={styles.imageWrapper}
          classImage={styles.image}
          src={href}
          alt={title}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.price}>{getSymbolCurrency(price)}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    );
  }
);
