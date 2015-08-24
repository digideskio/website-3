(function() {
  var getRootUrl, i, images, img, len, wait;

  wait = function(delay, callback) {
    return setTimeout(callback, delay);
  };

  images = document.getElementsByTagName('img');

  for (i = 0, len = images.length; i < len; i++) {
    img = images[i];
    img.onerror = function() {
      var a, li;
      a = this.parentNode;
      li = a.parentNode;
      if (li.tagName.toLowerCase() === 'li') {
        return li.parentNode.removeChild(li);
      } else {
        return this.parentNode.removeChild(this);
      }
    };
  }

  $.fn.preventScrollBubbling = function() {
    return $(this).bind('mousewheel', function(event, delta, deltaX, deltaY) {
      this.scrollTop -= deltaY * 20;
      return event.preventDefault();
    });
  };

  getRootUrl = function() {
    var rootUrl;
    rootUrl = document.location.protocol + "//" + (document.location.hostname || document.location.host);
    if (document.location.port || false) {
      rootUrl += ":" + document.location.port;
    }
    rootUrl += "/";
    return rootUrl;
  };

  $.expr[":"].internal = function(obj, index, meta, stack) {
    var $this, isInternalLink, rootUrl, url;
    $this = $(obj);
    url = $this.attr("href") || $this.data("href") || "";
    rootUrl = getRootUrl();
    isInternalLink = url.substring(0, rootUrl.length) === rootUrl || url.indexOf(":") === -1;
    return isInternalLink;
  };

  $.expr[":"].external = function(obj, index, meta, stack) {
    return $.expr[":"].internal(obj, index, meta, stack) === false;
  };

  $(function() {
    var $body, $document, hideModals, openLink, openOutboundLink;
    $document = $(document);
    $body = $(document.body);
    openLink = function(arg) {
      var action, url;
      url = arg.url, action = arg.action;
      if (action === 'new') {
        window.open(url, '_blank');
      } else if (action === 'same') {
        wait(100, function() {
          return document.location.href = url;
        });
      }
    };
    openOutboundLink = function(arg) {
      var action, hostname, url;
      url = arg.url, action = arg.action;
      hostname = url.replace(/^.+?\/+([^\/]+).*$/, '$1');
      if (typeof _gaq !== "undefined" && _gaq !== null) {
        _gaq.push(['_trackEvent', "Outbound Links", hostname, url, 0, true]);
      }
      openLink({
        url: url,
        action: action
      });
    };
    $body.on('click', 'a[href]:external', function(event) {
      var $this, action, url;
      $this = $(this);
      url = $this.attr('href');
      if (!url || url.indexOf('mailto:') === 0) {
        return;
      }
      if (event.which === 2 || event.metaKey) {
        action = 'default';
      } else {
        action = 'same';
        event.preventDefault();
      }
      openOutboundLink({
        url: url,
        action: action
      });
    });
    hideModals = function() {
      return $('.modal').hide();
    };
    $document.on('keyup', function(event) {
      if (event.keyCode === 27) {
        return hideModals();
      }
    });
    $body.on('click', '.modal.backdrop', function(event) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return hideModals();
    });
    $body.on('click', '.contact-button', function(event) {
      var $backdropModal, $contactModal, contactModalOffset;
      event.stopImmediatePropagation();
      event.preventDefault();
      if (typeof _gaq !== "undefined" && _gaq !== null) {
        _gaq.push(['_trackEvent', "Contact Modal", document.title, document.location.href, 0, true]);
      }
      $contactModal = $('.contact.modal').css({
        top: '5.5em',
        height: 'auto',
        opacity: 0
      }).show();
      $backdropModal = $('.modal.backdrop').css({
        height: window.innerHeight * 2
      });
      contactModalOffset = $contactModal.offset();
      if ($contactModal.height() + contactModalOffset.top * 2 > window.innerHeight) {
        console.log('asd');
        $contactModal.css({
          top: contactModalOffset.left,
          height: window.innerHeight - contactModalOffset.left * 2
        });
      }
      $backdropModal.show();
      return $contactModal.css({
        opacity: 1
      });
    });
    $('section.videos ul a').click(function(event) {
      var $video, video;
      if (event.which === 2 || event.metaKey) {
        return true;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      $video = $(this);
      video = {
        title: $video.attr('title'),
        width: $video.data('width'),
        height: $video.data('height'),
        href: $video.attr('href'),
        embed: $video.data('embed') || $video.attr('href')
      };
      $.fancybox.open({
        href: video.embed,
        title: video.title,
        width: video.width,
        height: video.height,
        padding: 0,
        type: 'iframe',
        swf: {
          allowfullscreen: true,
          wmode: 'transparent'
        }
      });
      openOutboundLink({
        url: video.href,
        action: false
      });
    });
    $('.js').removeClass('js');
    $('.more-to-read').hide();
    return $('.read-more').click(function() {
      if (typeof _gaq !== "undefined" && _gaq !== null) {
        _gaq.push(['_trackEvent', "Read More", document.title, document.location.href, 0, true]);
      }
      return $(this).hide().next('.more-to-read').show();
    });
  });

}).call(this);
