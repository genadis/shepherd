(function() {

  function init() {
    const shepherd = setupShepherd();

    setTimeout(function() {
      shepherd.start();
    }, 400);
  }

  function setupShepherd() {
    const shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'class-1 class-2',
        scrollTo: { behavior: 'smooth', block: 'center' },
        showCancelLink: true,
        tippyOptions: {
          maxWidth: 500
        }
      },
      useModalOverlay: true
    });

    shepherd.addStep('welcome', {
      text: `
         <p>
           Shepherd is a JavaScript library for guiding users through your app.
           It uses <a href="https://atomiks.github.io/tippyjs//" data-test-tippy-link>Tippy.js</a>,
           another open source library, to render dialogs for each tour "step".
         </p>
        
         <p>
           Among many things, Tippy makes sure your steps never end up off screen or cropped by an overflow.
           (Try resizing your browser to see what we mean.)
         </p>
         <p>
           It also offers a robust API for styling animations of steps
           as they enter and exit the view.
         </p>`,
      attachTo: {
        element: '.hero-welcome',
        on: 'bottom'
      },
      classes: 'shepherd shepherd-welcome',
      buttons: [
        {
          action: shepherd.cancel,
          classes: 'shepherd-button-secondary',
          text: 'Exit'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('including', {
      title: 'Including',
      text: 'Including Shepherd is easy! Just include tippy.all.min.js, shepherd.js, and a Shepherd theme file.',
      attachTo: {
        element: '.hero-including',
        on: 'bottom'
      },
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('creating', {
      title: 'Creating a Shepherd Tour',
      text: `Creating a Shepherd tour is easy. too!\
      Just create a \`Tour\` instance, and add as many steps as you want.`,
      attachTo: {
        element: '.hero-example',
        on: 'bottom'
      },
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('attaching', {
      title: 'Attaching to Elements',
      text: `Your tour steps can target and attach to elements in DOM (like this step).`,
      attachTo: {
        element: '.hero-example',
        on: 'bottom'
      },
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('centered-example', {
      title: 'Centered Shepherd Element',
      text: `But attachment is totally optional!\n \
      Without a target, a tour step will create an element that's centered within the view. \
      Check out the <a href="https://shepherdjs.dev/docs/">documentation</a> to learn more.`,
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('followup', {
      title: 'Learn more',
      text: 'Star Shepherd on Github so you remember it for your next project',
      attachTo: {
        element: '.hero-followup',
        on: 'top'
      },
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action: shepherd.next,
          text: 'Done'
        }
      ],
      modalOverlayOpeningPadding: '10'
    });

    return shepherd;
  }

  function ready() {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
      init();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }

  ready();

}).call(this);
