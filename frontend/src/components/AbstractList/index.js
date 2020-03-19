import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import styles               from './AbstractList.module.scss';

const ListItem = props => (<li {...props}/>);

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

class AbstractList extends Component {
  constructor (props) {
    super( props );
    const items = [];

    for (let i = 40; i > 0; i--) {
      items.push( i );
    }
    this.state = {
      items,
    };
    this.listRef = React.createRef();
  }

  loadItems = () => {
    const newItems = [];
    const { items } = this.state;
    for (let i = items.length + 40; i > items.length; i--) {
      newItems.push( i );
    }


    this.setState( state => ({
                     items: [...newItems, ...state.items],
                   })
    );
  };

  componentDidMount () {
    const list = this.listRef.current;
    list.scrollTop = list.scrollHeight;

    list.addEventListener( 'scroll', this.scrollHandler );
  }

  scrollHandler = (e) => {
    const list = this.listRef.current;
    if (list.scrollTop < 1) {
      this.loadItems();
    }
  };

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return true;
  }

  getSnapshotBeforeUpdate (prevProps, prevState) {
    if (prevState.items.length < this.state.items.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      return list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render () {
    const { items } = this.state;
    return (
      <ul ref={this.listRef} className={styles.list}>
        {
          items.map( item => (<ListItem className={styles.listItem} key={item}>{item}</ListItem>) )
        }
      </ul>
    );
  }
}

AbstractList.propTypes = {};

export default AbstractList;