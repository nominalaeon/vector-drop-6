
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
    this.menuItems = this.buildTitleMenu();

    console.info('TitleMenu initialized', this);
  }

  /**
   * General methods
   */

  buildTitleMenu() {
    var menu: Array<TM.TitleMenuItem> = [{
      action: () => {
        console.log('action', this);
        this.$store.commit('updatePlayerId', 'XXXX');
        this.$router.push(`/stage/test`);
      },
      label: 'Lorem ipsum' // New Game
    }, {
      action: () => {
        
      },
      label: 'Dolar dolarbilz' // Stage Select
    }];

    return menu;
  }

};

export default TitleMenu;

