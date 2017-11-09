
import Vue        from 'vue';
import Component  from 'vue-class-component';
import * as T     from '../../types/common';

@Component({
  name: 'LinkComponent',
  props: {
    url: String,
    description: String
  }
})

class Link extends Vue {
  link: T.Link = {
    description: 'Link',
    url: ''
  };

  mounted() {
    this.link.url = this.$props.url || this.link.url;
    this.link.description = this.$props.description || this.link.description;
  }
};

export default Link;
