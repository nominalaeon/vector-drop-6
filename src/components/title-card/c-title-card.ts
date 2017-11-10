
import Vue        from 'vue';
import Component  from 'vue-class-component';
import { Watch }  from 'vue-property-decorator';

import * as T     from '../../types/common';
import * as TC    from './i-title-card';

@Component({
  name: 'TitleCardComponent',
  props: {
    height: Number,
    width: Number
  }
})

class TitleCard extends Vue {
  fill: HTMLElement;
  points: String = 'm20,20 l160,0 l0,60 l-160,0 l0,-60';
  stroke: HTMLElement;

  mounted() {
    this.selectElements();

    console.info('TitleCard initialized', this);

    this.animate();
  }

  /**
   * General methods
   */
  
  animate() {
    var trace     = new TimelineLite({ repeat: 0 });
    var trace_dur = 6;
    var trace_pos = `-=${trace_dur / 2}`;
    var fill_dur  = 1.5;
    var fill_pos  = `-=${trace_dur}`;

    var configRoughEase = <RoughEaseConfig> {
      clamp: false,
      points: 50,
      randomize: true,
      strength: 2,
      taper: 'none',
      template: Circ.easeIn
    };

    trace
      .fromTo(this.stroke, trace_dur, {
        drawSVG: '0% 0%'
      }, {
        drawSVG: '0% 100%',
        ease: Expo.easeInOut
      }, trace_pos)
      .to(this.stroke, trace_dur, {
        drawSVG: '100% 100%',
        ease: Expo.easeOut
      }, trace_pos)
      .to(this.fill, fill_dur, {
        opacity: '1',
        ease: RoughEase.ease.config(configRoughEase)
      }, fill_pos);
  }

  selectElements() {
    this.fill = <HTMLElement> this.$el.querySelector('.vd6-title-card__path--fill');
    // this.logo = _generateLogo();
    this.stroke = <HTMLElement> this.$el.querySelector('.vd6-title-card__path--stroke');
  }

};

export default TitleCard;
