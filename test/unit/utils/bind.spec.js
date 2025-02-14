import { bindAdvance, bindButtonEvents, bindCancelLink } from '../../../src/js/utils/bind.js';
import { Step } from '../../../src/js/step';
import { spy } from 'sinon';
import { Tour } from '../../../src/js/tour';

describe('Bind Utils', function() {
  describe('bindAdvance()', () => {
    let event;
    let link;
    let hasAdvanced = false;

    const advanceOnSelector = 'test-selector';
    const advanceOnEventName = 'test-event';
    const tourProto = {
      next() { hasAdvanced = true; }
    };

    beforeEach(() => {
      event = new Event(advanceOnEventName);

      link = document.createElement('a');
      link.classList.add(advanceOnSelector);
      link.textContent = 'Click Me 👋';

      document.body.appendChild(link);
    });

    afterEach(() => {
      link.remove();
    });

    it('triggers the `advanceOn` option via object', () => {
      const step = new Step(tourProto, {
        advanceOn: { selector: `.${advanceOnSelector}`, event: advanceOnEventName }
      });

      step.isOpen = () => true;

      bindAdvance(step);
      link.dispatchEvent(event);

      expect(link.classList.contains(advanceOnSelector)).toBe(true);
      expect(hasAdvanced, '`next()` triggered for advanceOn').toBe(true);
    });

    it('captures events attached to no element', () => {
      const step = new Step(tourProto, {
        advanceOn: { event: advanceOnEventName }
      });

      step.isOpen = () => true;

      bindAdvance(step);
      document.body.dispatchEvent(event);

      expect(hasAdvanced, '`next()` triggered for advanceOn').toBeTruthy();
    });

    it('should support bubbling events for nodes that do not exist yet', () => {
      const event = new Event('blur');

      const step = new Step(tourProto, {
        text: 'Lorem ipsum dolor: <a href="https://example.com">sit amet</a>',
        advanceOn: {
          selector: 'a[href="https://example.com"]',
          event: 'blur'
        }
      });

      step.isOpen = () => true;

      bindAdvance(step);
      document.body.dispatchEvent(event);

      expect(hasAdvanced, '`next()` triggered for advanceOn').toBeTruthy();
    });

    it('calls `removeEventListener` when destroyed', function(done) {
      const bodySpy = spy(document.body, 'removeEventListener');
      const step = new Step(tourProto, {
        advanceOn: { event: advanceOnEventName }
      });

      step.isOpen = () => true;

      bindAdvance(step);
      step.trigger('destroy');

      expect(bodySpy.called).toBe(true);
      bodySpy.restore();

      done();
    });
  });

  describe('bindButtonEvents()', () => {
    const link = document.createElement('a');
    const step = new Step(new Tour(), {});
    it('adds button events', () => {
      const event = new Event('test');
      const hover = new Event('mouseover');
      let eventTriggered = false;

      bindButtonEvents({
        events: {
          'mouseover': '1',
          test: () => eventTriggered = true
        },
        text: 'Next',
        action: () => {}
      }, link, step);

      link.dispatchEvent(event);
      link.dispatchEvent(hover);
      expect(eventTriggered, 'custom button event was bound/triggered').toBeTruthy();
    });

    it('removes events once destroyed', () => {
      step.destroy();

      expect(link.hasAttribute('data-button-event'), 'attribute to confirm event is removed').toBeFalsy();
    });

  });

  describe('bindCancelLink()', () => {
    it('adds an event handler for the cancel button', () => {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      const link = document.createElement('a');
      const step = new Step();
      let cancelCalled = false;

      step.cancel = () => cancelCalled = true;
      bindCancelLink(link, step);

      link.dispatchEvent(event);
      expect(cancelCalled, 'cancel method was called from bound click event').toBeTruthy();
    });
  });
});
