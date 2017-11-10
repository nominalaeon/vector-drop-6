
import Vue        from 'vue';
import Component  from 'vue-class-component';

import * as T     from '../../types/common';
import * as TM    from './i-title-menu';

@Component({
  name: 'TitleMenuComponent',
  props: {}
})

class TitleMenu extends Vue {
  private vm: TM.TitleMenuVM = {
    menuItems: []
  };
  
  get menuItems() {
    return this.vm.menuItems || [];
  }
  set menuItems(menuItems) {
    this.vm.menuItems = menuItems;
  }
  
  mounted() {
    this.menuItems = buildTitleMenu();

    console.info('TitleMenu initialized', this);
  };

  /**
   * General methods
   */

};

export default TitleMenu;

function buildTitleMenu() {
  var menu: Array<TM.TitleMenuItem> = [{
    label: 'Lorem ipsum' // New Game
  }, {
    label: 'Dolar dolarbilz' // Stage Select
  }];

  return menu;
}
