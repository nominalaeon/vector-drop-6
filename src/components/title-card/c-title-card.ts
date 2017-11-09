
import * as DrawSVG   from '../_vendor/gsap/DrawSVGPlugin';
import * as GSAP from 'gsap';
import Vue       from 'vue';
import Component from 'vue-class-component';

import * as T    from '../../types/common';
// import * as TG   from '../../types/gsap';

@Component({
  name: 'TitleCardComponent',
  props: {
    height: Number,
    width: Number
  }
})

class TitleCard extends Vue {
  dimension: T.Dimension = {
    height: 100,
    width: 100
  };
  fill: HTMLElement;
  points: String = 'm20,20 l60,0 l0,60 l-60,0 l0,-60';
  stroke: HTMLElement;

  mounted() {
    this.selectElements();
    console.log('TitleCard onMounted', this);
    this.animate();
  };

  /**
   * General methods
   */
  
  animate() {
    var trace         = new GSAP.TimelineLite({ repeat: 0 });
    var trace_dur     = 6;
    var trace_pos     = `-=${trace_dur / 2}`;
    var trace_dur_col = 1.5;
    var trace_pos_col = `-=${trace_dur}`;

    var configRoughEase = <RoughEaseConfig> {
      clamp: false,
      points: 50,
      randomize: true,
      strength: 2,
      taper: 'none',
      template: GSAP.Circ.easeIn
    };

    console.log('onMounted', this);

    trace
      .fromTo(this.stroke, trace_dur, {
        drawSVG: '0% 0%'
      }, {
        drawSVG: '0% 100%',
        ease: GSAP.Expo.easeInOut
      }, trace_pos)
      .to(this.stroke, trace_dur, {
        drawSVG: '100% 100%',
        ease: GSAP.Expo.easeOut
      }, trace_pos)
      .to(this.fill, trace_dur_col, {
        opacity: '1',
        ease: GSAP.RoughEase.bind(configRoughEase).ease
      }, trace_pos_col);
  }

  selectElements() {
    this.fill = <HTMLElement> this.$el.querySelector('.vd6-title-card__path--fill');
    // this.logo = _generateLogo();
    this.stroke = <HTMLElement> this.$el.querySelector('.vd6-title-card__path--stroke');
  }

};

export default TitleCard;
