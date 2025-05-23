! function (e) {
	"use strict";

	function t() {
		mkdf.scroll = e(window).scrollTop(), mkdf.body.hasClass("mkdf-dark-header") && (mkdf.defaultHeaderStyle = "mkdf-dark-header"), mkdf.body.hasClass("mkdf-light-header") && (mkdf.defaultHeaderStyle = "mkdf-light-header")
	}

	function a() { }

	function d() {
		mkdf.windowWidth = e(window).width(), mkdf.windowHeight = e(window).height()
	}

	function o() {
		mkdf.scroll = e(window).scrollTop()
	}
	switch (window.mkdf = {}, mkdf.modules = {}, mkdf.scroll = 0, mkdf.window = e(window), mkdf.document = e(document), mkdf.windowWidth = e(window).width(), mkdf.windowHeight = e(window).height(), mkdf.body = e("body"), mkdf.html = e("html, body"), mkdf.htmlEl = e("html"), mkdf.menuDropdownHeightSet = !1, mkdf.defaultHeaderStyle = "", mkdf.minVideoWidth = 1500, mkdf.videoWidthOriginal = 1280, mkdf.videoHeightOriginal = 720, mkdf.videoRatio = 1.61, mkdf.mkdfOnDocumentReady = t, mkdf.mkdfOnWindowLoad = a, mkdf.mkdfOnWindowResize = d, mkdf.mkdfOnWindowScroll = o, e(document).ready(t), e(window).on("load", a), e(window).resize(d), e(window).scroll(o), !0) {
		case mkdf.body.hasClass("mkdf-grid-1300"):
			mkdf.boxedLayoutWidth = 1350;
			break;
		case mkdf.body.hasClass("mkdf-grid-1200"):
			mkdf.boxedLayoutWidth = 1250;
			break;
		case mkdf.body.hasClass("mkdf-grid-1000"):
			mkdf.boxedLayoutWidth = 1050;
			break;
		case mkdf.body.hasClass("mkdf-grid-800"):
			mkdf.boxedLayoutWidth = 850;
			break;
		default:
			mkdf.boxedLayoutWidth = 1150
	}
}(jQuery),
	function (P) {
		"use strict";
		var e = {};

		function t() {
			u().init(), -1 < navigator.appVersion.toLowerCase().indexOf("mac") && mkdf.body.hasClass("mkdf-smooth-scroll") && mkdf.body.removeClass("mkdf-smooth-scroll"), s().init(), P("#mkdf-back-to-top").on("click", function (e) {
				e.preventDefault(), mkdf.html.animate({
					scrollTop: 0
				}, mkdf.window.scrollTop() / 3, "linear")
			}), mkdf.window.scroll(function () {
				var e = P(this).scrollTop(),
					t = P(this).height();
				r((0 < e ? e + t / 2 : 1) < 1e3 ? "off" : "on")
			}), l(), m(), f(), k(),
				function () {
					var e = P(".mkdf-preload-background");
					e.length && e.each(function () {
						var e = P(this);
						if ("" !== e.css("background-image") && "none" !== e.css("background-image")) {
							var t = e.attr("style");
							if (t = (t = t.match(/url\(["']?([^'")]+)['"]?\)/)) ? t[1] : "") {
								var a = new Image;
								a.src = t, P(a).on("load", function () {
									e.removeClass("mkdf-preload-background")
								})
							}
						} else P(window).on("load", function () {
							e.removeClass("mkdf-preload-background")
						})
					})
				}(), c(),
				function () {
					var e = P(".mkdf-search-post-type");
					e.length && e.each(function () {
						var e = P(this),
							t = e.find(".mkdf-post-type-search-field"),
							d = e.siblings(".mkdf-post-type-search-results"),
							o = e.find(".mkdf-search-loading"),
							i = e.find(".mkdf-search-icon");
						o.addClass("mkdf-hidden");
						var n, s = e.data("post-type");
						t.on("keyup paste", function () {
							var a = P(this);
							a.attr("autocomplete", "off"), o.removeClass("mkdf-hidden"), i.addClass("mkdf-hidden"), clearTimeout(n), n = setTimeout(function () {
								var e = a.val();
								if (e.length < 3) d.html(""), d.fadeOut(), o.addClass("mkdf-hidden"), i.removeClass("mkdf-hidden");
								else {
									var t = {
										action: "fiorello_mikado_search_post_types",
										term: e,
										postType: s
									};
									P.ajax({
										type: "POST",
										data: t,
										url: mkdfGlobalVars.vars.mkdfAjaxUrl,
										success: function (e) {
											var t = JSON.parse(e);
											"success" === t.status && (o.addClass("mkdf-hidden"), i.removeClass("mkdf-hidden"), d.html(t.data.html), d.fadeIn())
										},
										error: function (e, t, a) {
											console.log("Status: " + t), console.log("Error: " + a), o.addClass("mkdf-hidden"), i.removeClass("mkdf-hidden"), d.fadeOut()
										}
									})
								}
							}, 500)
						}), t.on("focusout", function () {
							o.addClass("mkdf-hidden"), i.removeClass("mkdf-hidden"), d.fadeOut()
						})
					})
				}(),
				function () {
					var e = P(".mkdf-dashboard-form");
					e.length && e.each(function () {
						var e = P(this),
							o = e.find("button"),
							i = o.data("updating-text"),
							n = o.data("updated-text"),
							s = e.data("action");
						e.on("submit", function (e) {
							e.preventDefault();
							var a = o.html(),
								t = P(this).find(".mkdf-dashboard-gallery-upload-hidden"),
								l = [];
							o.html(i);
							var m = new FormData;
							t.each(function () {
								var e, t = P(this),
									a = t.attr("name"),
									d = t.attr("id"),
									o = t[0].files;
								if ("-1" != a.indexOf("[")) {
									e = a.substring(0, a.indexOf("[")) + "_mkdf_regarray_";
									var i = d.indexOf("["),
										n = d.indexOf("]"),
										s = d.substring(i + 1, n);
									l.push(e), e = e + s + "_"
								} else e = a + "_mkdf_reg_";
								0 === o.length && m.append(e, new File([""], "mkdf-dummy-file.txt", {
									type: "text/plain"
								}));
								for (var r = 0; r < o.length; r++) {
									1 === o[r].name.match(/\./g).length && -1 !== P.inArray(o[r].type, ["image/png", "image/jpg", "image/jpeg", "application/pdf"]) && m.append(e + r, o[r])
								}
							}), m.append("action", s);
							var d = P(this).serialize();
							return m.append("data", d), P.ajax({
								type: "POST",
								data: m,
								contentType: !1,
								processData: !1,
								url: mkdfGlobalVars.vars.mkdfAjaxUrl,
								success: function (e) {
									var t;
									t = JSON.parse(e), mkdf.modules.socialLogin.mkdfRenderAjaxResponseMessage(t), "success" === t.status ? (o.html(n), window.location = t.redirect) : o.html(a)
								}
							}), !1
						})
					})
				}()
		}

		function a() {
			T(),
				function () {
					if (mkdf.body.hasClass("mkdf-smooth-page-transitions")) {
						if (mkdf.body.hasClass("mkdf-smooth-page-transitions-preloader")) {
							var t = P("body > .mkdf-smooth-transition-loader.mkdf-mimic-ajax");
							t.fadeOut(500), P(window).on("bind", "pageshow", function (e) {
								e.originalEvent.persisted && t.fadeOut(500)
							})
						}
						if (window.addEventListener("pageshow", function (e) {
							var t = e.persisted || void 0 !== window.performance && 2 === window.performance.navigation.type;
							t && window.location.reload()
						}), mkdf.body.hasClass("mkdf-smooth-page-transitions-fadeout")) {
							var e = P("a");
							e.on("click", function (e) {
								var t = P(this);
								(t.parents(".mkdf-shopping-cart-dropdown").length || t.parent(".product-remove").length) && t.hasClass("remove") || 1 === e.which && 0 <= t.attr("href").indexOf(window.location.host) && void 0 === t.data("rel") && void 0 === t.attr("rel") && !t.hasClass("lightbox-active") && (void 0 === t.attr("target") || "_self" === t.attr("target")) && t.attr("href").split("#")[0] !== window.location.href.split("#")[0] && (e.preventDefault(), P(".mkdf-wrapper-inner").fadeOut(1e3, function () {
									window.location = t.attr("href")
								}))
							})
						}
					}
				}(), p(), h().init()
		}

		function d() {
			m()
		}

		function o(e) {
			n(e)
		}

		function i(e) {
			for (var t = [37, 38, 39, 40], a = t.length; a--;)
				if (e.keyCode === t[a]) return void n(e)
		}

		function n(e) {
			(e = e || window.event).preventDefault && e.preventDefault(), e.returnValue = !1
		} (mkdf.modules.common = e).mkdfFluidVideo = f, e.mkdfEnableScroll = function () {
			window.removeEventListener && window.removeEventListener("DOMMouseScroll", o, !1);
			window.onmousewheel = document.onmousewheel = document.onkeydown = null
		}, e.mkdfDisableScroll = function () {
			window.addEventListener && window.addEventListener("DOMMouseScroll", o, !1);
			window.onmousewheel = document.onmousewheel = o, document.onkeydown = i
		}, e.mkdfOwlSlider = k, e.mkdfAlterSliderPagination = p, e.mkdfInitParallax = T, e.mkdfInitSelfHostedVideoPlayer = l, e.mkdfSelfHostedVideoSize = m, e.mkdfPrettyPhoto = c, e.mkdfStickySidebarWidget = h, e.getLoadMoreData = function (e) {
			var t = e.data(),
				a = {};
			for (var d in t) t.hasOwnProperty(d) && void 0 !== t[d] && !1 !== t[d] && (a[d] = t[d]);
			return a
		}, e.setLoadMoreAjaxData = function (e, t) {
			var a = {
				action: t
			};
			for (var d in e) e.hasOwnProperty(d) && void 0 !== e[d] && !1 !== e[d] && (a[d] = e[d]);
			return a
		}, e.setFixedImageProportionSize = function (e, t, a, d) {
			if (e.hasClass("mkdf-masonry-images-fixed") || !0 === d) {
				var o = parseInt(t.css("paddingLeft"), 10),
					i = a - 2 * o,
					n = e.find(".mkdf-masonry-size-small"),
					s = e.find(".mkdf-masonry-size-large-width"),
					r = e.find(".mkdf-masonry-size-large-height"),
					l = e.find(".mkdf-masonry-size-large-width-height");
				n.css("height", i), r.css("height", Math.round(2 * (i + o))), 680 < mkdf.windowWidth ? (s.css("height", i), l.css("height", Math.round(2 * (i + o)))) : (s.css("height", Math.round(i / 2)), l.css("height", i))
			}
		}, e.mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, e.mkdfOnWindowResize = d, P(document).ready(t), P(window).on("load", a), P(window).resize(d);
		var s = function () {
			function n(t) {
				P(".mkdf-main-menu, .mkdf-mobile-nav, .mkdf-fullscreen-menu").each(function () {
					var e = P(this);
					t.parents(e).length && (e.find(".mkdf-active-item").removeClass("mkdf-active-item"), t.parent().addClass("mkdf-active-item"), e.find("a").removeClass("current"), t.addClass("current"))
				})
			}
			var t = function (e) {
				var t, a = P(".mkdf-main-menu a, .mkdf-mobile-nav a, .mkdf-fullscreen-menu a"),
					d = e,
					o = "" !== d ? P('[data-mkdf-anchor="' + d + '"]') : "";
				if ("" !== d && 0 < o.length) {
					var i = o.offset().top;
					return t = i - s(i) - mkdfGlobalVars.vars.mkdfAddForAdminBar, a.length && a.each(function () {
						var e = P(this); - 1 < e.attr("href").indexOf(d) && n(e)
					}), mkdf.html.stop().animate({
						scrollTop: Math.round(t)
					}, 1e3, function () {
						history.pushState && history.pushState(null, "", "#" + d)
					}), !1
				}
			},
				s = function (e) {
					"mkdf-sticky-header-on-scroll-down-up" === mkdf.modules.stickyHeader.behaviour && (mkdf.modules.stickyHeader.isStickyVisible = e > mkdf.modules.header.stickyAppearAmount), "mkdf-sticky-header-on-scroll-up" === mkdf.modules.stickyHeader.behaviour && e > mkdf.scroll && (mkdf.modules.stickyHeader.isStickyVisible = !1);
					var t = mkdf.modules.stickyHeader.isStickyVisible ? mkdfGlobalVars.vars.mkdfStickyHeaderTransparencyHeight : mkdfPerPageVars.vars.mkdfHeaderTransparencyHeight;
					return mkdf.windowWidth < 1025 && (t = 0), t
				};
			return {
				init: function () {
					P("[data-mkdf-anchor]").length && (mkdf.document.on("click", ".mkdf-main-menu a, .mkdf-fullscreen-menu a, .mkdf-btn, .mkdf-anchor, .mkdf-mobile-nav a", function () {
						var e, t = P(this),
							a = t.prop("hash").split("#")[1],
							d = "" !== a ? P('[data-mkdf-anchor="' + a + '"]') : "";
						if ("" !== a && 0 < d.length) {
							var o = d.offset().top;
							return e = o - s(o) - mkdfGlobalVars.vars.mkdfAddForAdminBar, n(t), mkdf.html.stop().animate({
								scrollTop: Math.round(e)
							}, 1e3, function () {
								history.pushState && history.pushState(null, "", "#" + a)
							}), !1
						}
					}), function () {
						var t, e = P("[data-mkdf-anchor]"),
							a = window.location.href.split("#")[0];
						"/" !== a.substr(-1) && (a += "/"), e.waypoint(function (e) {
							"down" === e && (t = 0 < P(this.element).length ? P(this.element).data("mkdf-anchor") : P(this).data("mkdf-anchor"), n(P("a[href='" + a + "#" + t + "']")))
						}, {
							offset: "50%"
						}), e.waypoint(function (e) {
							"up" === e && (t = 0 < P(this.element).length ? P(this.element).data("mkdf-anchor") : P(this).data("mkdf-anchor"), n(P("a[href='" + a + "#" + t + "']")))
						}, {
							offset: function () {
								return -(P(this.element).outerHeight() - 150)
							}
						})
					}(), P(window).on("load", function () {
						! function () {
							var e = window.location.hash.split("#")[1];
							"" !== e && 0 < P('[data-mkdf-anchor="' + e + '"]').length && t(e)
						}()
					}))
				}
			}
		};

		function r(e) {
			var t = P("#mkdf-back-to-top");
			t.removeClass("off on"), "on" === e ? t.addClass("on") : t.addClass("off")
		}

		function l() {
			var e = P(".mkdf-self-hosted-video");
			e.length && e.mediaelementplayer({
				audioWidth: "100%"
			})
		}

		function m() {
			var e = P(".mkdf-self-hosted-video-holder .mkdf-video-wrap");
			e.length && e.each(function () {
				var e = P(this),
					t = e.closest(".mkdf-self-hosted-video-holder").outerWidth(),
					a = t / mkdf.videoRatio;
				navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/) && (e.parent().width(t), e.parent().height(a)), e.width(t), e.height(a), e.find("video, .mejs-overlay, .mejs-poster").width(t), e.find("video, .mejs-overlay, .mejs-poster").height(a)
			})
		}

		function f() {
			fluidvids.init({
				selector: ["iframe"],
				players: ["www.youtube.com", "player.vimeo.com"]
			})
		}

		function c() {
			P("a[data-rel^='prettyPhoto']").prettyPhoto({
				hook: "data-rel",
				animation_speed: "normal",
				slideshow: !1,
				autoplay_slideshow: !1,
				opacity: .8,
				show_title: !0,
				allow_resize: !0,
				horizontal_padding: 0,
				default_width: 960,
				default_height: 540,
				counter_separator_label: "/",
				theme: "pp_default",
				hideflash: !1,
				wmode: "opaque",
				autoplay: !0,
				modal: !1,
				overlay_gallery: !1,
				keyboard_shortcuts: !0,
				deeplinking: !1,
				custom_markup: "",
				social_tools: !1,
				markup: '<div class="pp_pic_holder">                         <div class="ppt">&nbsp;</div>                         <div class="pp_top">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                         <div class="pp_content_container">                             <div class="pp_left">                             <div class="pp_right">                                 <div class="pp_content">                                     <div class="pp_loaderIcon"></div>                                     <div class="pp_fade">                                         <a href="#" class="pp_expand" title="Expand the image">Expand</a>                                         <div class="pp_hoverContainer">                                             <a class="pp_next" href="#"> \t\t\t\t\t\t\t\t\t\t\t\t<svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="16.667px" viewBox="0 0 75.417 16.667" enable-background="new 0 0 75.417 16.667" xml:space="preserve"> \t\t\t\t\t\t\t\t\t\t\t\t\t<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1.681" y1="7.817" x2="73.257" y2="7.817"/> \t\t\t\t\t\t\t\t\t\t\t\t\t<polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="67.235,1.351 73.985,7.817 67.235,15.316"/> \t\t\t\t\t\t\t\t\t\t\t\t</svg> \t\t\t\t\t\t\t\t\t\t\t</a>                                             <a class="pp_previous" href="#">\t\t\t\t\t\t\t\t\t\t\t\t<svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="16.667px" viewBox="0 0 75.417 16.667" enable-background="new 0 0 75.417 16.667" xml:space="preserve">\t\t\t\t\t\t\t\t\t\t\t\t\t<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1.681" y1="7.817" x2="73.257" y2="7.817"/>\t\t\t\t\t\t\t\t\t\t\t\t\t<polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="8.235,1.351 1.681,7.817 8.235,15.316"/>\t\t\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t\t\t\t<div id="pp_full_res"></div> \t\t\t\t\t\t\t\t\t\t\t\t\t<div class="pp_details"> \t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="pp_nav"> \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_previous"></a> \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class="currentTextHolder">0/0</p> \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_next"></a> \t\t\t\t\t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class="pp_description"></p> \t\t\t\t\t\t\t\t\t\t\t\t\t\t{pp_social} \t\t\t\t\t\t\t\t\t\t\t\t\t\t<a class="pp_close" href="#">Close</a> \t\t\t\t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t<div class="pp_bottom"> \t\t\t\t\t\t\t\t\t\t<div class="pp_left"></div> \t\t\t\t\t\t\t\t\t\t<div class="pp_middle"></div> \t\t\t\t\t\t\t\t\t\t<div class="pp_right"></div> \t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t<div class="pp_overlay"></div>'
			})
		}
		var u = function () {
			var e = P(".mkdf-icon-has-hover");
			return {
				init: function () {
					e.length && e.each(function () {
						! function (e) {
							if (void 0 !== e.data("hover-color")) {
								var t = function (e) {
									e.data.icon.css("color", e.data.color)
								},
									a = e.data("hover-color"),
									d = e.css("color");
								"" !== a && (e.on("mouseenter", {
									icon: e,
									color: a
								}, t), e.on("mouseleave", {
									icon: e,
									color: d
								}, t))
							}
						}(P(this))
					})
				}
			}
		};

		function T() {
			var e = P(".mkdf-parallax-row-holder");
			e.length && e.each(function () {
				var e = P(this),
					t = e.data("parallax-bg-image"),
					a = .4 * e.data("parallax-bg-speed"),
					d = 0;
				void 0 !== e.data("parallax-bg-height") && !1 !== e.data("parallax-bg-height") && (d = parseInt(e.data("parallax-bg-height"))), e.css({
					"background-image": "url(" + t + ")"
				}), 0 < d && e.css({
					"min-height": d + "px",
					height: d + "px"
				}), e.parallax("50%", a)
			})
		}

		function h() {
			var e = P(".mkdf-widget-sticky-sidebar"),
				t = P(".mkdf-page-header"),
				c = t.length ? t.outerHeight() : 0,
				n = 0,
				s = 0,
				r = 0,
				l = 0,
				u = [];

			function a() {
				u.length && P.each(u, function (e) {
					u[e].object;
					var t = u[e].offset,
						a = u[e].position,
						d = u[e].height,
						o = u[e].width,
						i = u[e].sidebarHolder,
						n = u[e].sidebarHolderHeight;
					if (mkdf.body.hasClass("mkdf-fixed-on-scroll")) {
						var s = P(".mkdf-fixed-wrapper.fixed");
						s.length && (c = s.outerHeight() + mkdfGlobalVars.vars.mkdfAddForAdminBar)
					} else mkdf.body.hasClass("mkdf-no-behavior") && (c = mkdfGlobalVars.vars.mkdfAddForAdminBar);
					if (1024 < mkdf.windowWidth && i.length) {
						var r = -(a - c),
							l = d - a - 40,
							m = n + t - c - a - mkdfGlobalVars.vars.mkdfTopBarHeight;
						if (mkdf.scroll >= t - c && d < n)
							if (i.hasClass("mkdf-sticky-sidebar-appeared") ? i.css({
								top: r + "px"
							}) : i.addClass("mkdf-sticky-sidebar-appeared").css({
								position: "fixed",
								top: r + "px",
								width: o,
								"margin-top": "-10px"
							}).animate({
								"margin-top": "0"
							}, 200), mkdf.scroll + l >= m) {
								var f = n - l + r - c;
								i.css({
									position: "absolute",
									top: f + "px"
								})
							} else i.hasClass("mkdf-sticky-sidebar-appeared") && i.css({
								position: "fixed",
								top: r + "px"
							});
						else i.removeClass("mkdf-sticky-sidebar-appeared").css({
							position: "relative",
							top: "0",
							width: "auto"
						})
					} else i.removeClass("mkdf-sticky-sidebar-appeared").css({
						position: "relative",
						top: "0",
						width: "auto"
					})
				})
			}
			return {
				init: function () {
					e.length && e.each(function () {
						var e = P(this),
							t = e.parents("aside.mkdf-sidebar"),
							a = e.parents(".wpb_widgetised_column"),
							d = "",
							o = 0;
						if (n = e.offset().top, s = e.position().top, l = r = 0, t.length) {
							r = t.outerHeight(), l = t.outerWidth(), o = (d = t).parent().parent().outerHeight();
							var i = t.parent().parent().find(".mkdf-blog-holder");
							i.length && (o -= parseInt(i.css("marginBottom")))
						} else a.length && (r = a.outerHeight(), l = a.outerWidth(), o = (d = a).parents(".vc_row").outerHeight());
						u.push({
							object: e,
							offset: n,
							position: s,
							height: r,
							width: l,
							sidebarHolder: d,
							sidebarHolderHeight: o
						})
					}), a(), P(window).scroll(function () {
						a()
					})
				},
				reInit: a
			}
		}

		function k() {
			var e = P(".mkdf-owl-slider");
			e.length && e.each(function () {
				var a, t = P(this),
					e = P(this),
					d = t.children().length,
					o = 1,
					i = 1,
					n = !0,
					s = !0,
					r = !0,
					l = 5e3,
					m = 600,
					f = 0,
					c = 0,
					u = 0,
					h = 0,
					k = !1,
					p = !1,
					g = !1,
					v = !1,
					y = !1,
					w = !0,
					b = !1,
					C = !1,
					x = !!t.hasClass("mkdf-pl-is-slider"),
					S = x ? t.parent() : t;
				if (void 0 === t.data("number-of-items") || !1 === t.data("number-of-items") || x || (o = t.data("number-of-items")), void 0 !== S.data("number-of-columns") && !1 !== S.data("number-of-columns") && x && (o = S.data("number-of-columns")), void 0 !== S.data("number-of-rows") && !1 !== S.data("number-of-rows") && 1 != S.data("number-of-rows")) {
					i = S.data("number-of-rows");
					var I = t.children();
					if (!t.hasClass("owl-loaded"))
						for (var _ = 0; _ <= d; _ += i) I.slice(_, _ + i).wrapAll('<div class="mkdf-item-outer-holder" />')
				}
				"no" === S.data("enable-autoplay") && (s = !1), "no" === S.data("enable-autoplay-hover-pause") && (r = !1), void 0 !== S.data("slider-speed") && !1 !== S.data("slider-speed") && (l = S.data("slider-speed")), void 0 !== S.data("slider-speed-animation") && !1 !== S.data("slider-speed-animation") && (m = S.data("slider-speed-animation")), void 0 !== S.data("slider-margin") && !1 !== S.data("slider-margin") ? f = "no" === S.data("slider-margin") ? 0 : S.data("slider-margin") : t.parent().hasClass("mkdf-huge-space") ? f = 60 : t.parent().hasClass("mkdf-large-space") ? f = 50 : t.parent().hasClass("mkdf-medium-space") ? f = 40 : t.parent().hasClass("mkdf-normal-space") ? f = 30 : t.parent().hasClass("mkdf-small-space") ? f = 20 : t.parent().hasClass("mkdf-tiny-space") && (f = 10), "yes" === S.data("slider-padding") && (k = !0, h = parseInt(.28 * t.outerWidth()), f = 50), "yes" === S.data("enable-center") && (p = !0), "yes" === S.data("enable-auto-width") && (g = !0), void 0 !== S.data("slider-animate-in") && !1 !== S.data("slider-animate-in") && (v = S.data("slider-animate-in")), void 0 !== S.data("slider-animate-out") && !1 !== S.data("slider-animate-out") && (y = S.data("slider-animate-out")), "no" === S.data("enable-navigation") && (w = !1), "yes" === S.data("enable-pagination") && (b = !0), "yes" === S.data("enable-thumbnail") && (C = !0), w && b && t.addClass("mkdf-slider-has-both-nav"), d <= 1 && (b = w = s = n = !1);
				var O = 2,
					z = 3,
					A = o;
				if (o < 3 && (z = O = o), 4 < o && (A = 4), (k || 30 < f) && (c = 20, u = 30), 0 < f && f <= 30 && (u = c = f), t.waitForImages(function () {
					e = t.owlCarousel({
						items: o,
						loop: n,
						slideBy: o,
						autoplay: s,
						autoplayHoverPause: r,
						autoplayTimeout: l,
						smartSpeed: m,
						margin: f,
						stagePadding: h,
						center: p,
						autoWidth: g,
						animateIn: v,
						animateOut: y,
						dots: b,
						nav: w,
						navText: ['<span class="mkdf-prev-icon"><svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="16.667px" viewBox="0 0 75.417 16.667" enable-background="new 0 0 75.417 16.667" xml:space="preserve"><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1.681" y1="7.817" x2="73.257" y2="7.817"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="8.235,1.351 1.681,7.817 8.235,15.316"/></svg></span>', '<span class="mkdf-next-icon"><svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="16.667px" viewBox="0 0 75.417 16.667" enable-background="new 0 0 75.417 16.667" xml:space="preserve"><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1.681" y1="7.817" x2="73.257" y2="7.817"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="67.235,1.351 73.985,7.817 67.235,15.316"/></svg></span>'],
						responsive: {
							0: {
								items: 1,
								margin: c,
								stagePadding: 0,
								center: !1,
								autoWidth: !1
							},
							681: {
								items: O,
								margin: u
							},
							769: {
								items: z,
								margin: u
							},
							1025: {
								items: A
							},
							1281: {
								items: o
							}
						},
						onInitialize: function () {
							t.css("visibility", "visible"), T(), C && a.find(".mkdf-slider-thumbnail-item:first-child").addClass("active")
						},
						onTranslate: function (e) {
							if (C) {
								var t = e.item.index + 1;
								a.find(".mkdf-slider-thumbnail-item.active").removeClass("active"), a.find(".mkdf-slider-thumbnail-item:nth-child(" + t + ")").addClass("active")
							}
						},
						onDrag: function (e) {
							mkdf.body.hasClass("mkdf-smooth-page-transitions-fadeout") && (0 < e.isTrigger && t.addClass("mkdf-slider-is-moving"))
						},
						onDragged: function () {
							mkdf.body.hasClass("mkdf-smooth-page-transitions-fadeout") && t.hasClass("mkdf-slider-is-moving") && setTimeout(function () {
								t.removeClass("mkdf-slider-is-moving")
							}, 500)
						}
					})
				}), C) {
					a = t.parent().find(".mkdf-slider-thumbnail");
					var D = "";
					switch (parseInt(a.data("thumbnail-count")) % 6) {
						case 2:
							D = "two";
							break;
						case 3:
							D = "three";
							break;
						case 4:
							D = "four";
							break;
						case 5:
							D = "five";
							break;
						case 0:
						default:
							D = "six"
					}
					"" !== D && a.addClass("mkdf-slider-columns-" + D), a.find(".mkdf-slider-thumbnail-item").on("click", function () {
						P(this).siblings(".active").removeClass("active"), P(this).addClass("active"), e.trigger("to.owl.carousel", [P(this).index(), m])
					})
				}
			})
		}

		function p() {
			var e = P(".mkdf-owl-slider");
			e.length && e.each(function () {
				var a = P(this),
					e = a.find(".owl-dots"),
					t = a.find(".owl-dot"),
					d = e.find(".owl-dot:first-of-type"),
					o = e.find(".owl-dot:last-of-type"),
					i = t.length;
				d.prepend('<div class="mkdf-owl-dot-num mkdf-first-dot">01</div>'), i < 10 && (i = "0" + i), o.prepend('<div class="mkdf-owl-dot-num">' + i + "</div>");
				a.on("translate.owl.carousel", function (e) {
					! function (e) {
						var t = e.page.index + 1;
						t < 10 && (t = "0" + t), a.find(".mkdf-first-dot").html(t)
					}(e)
				})
			})
		}
	}(jQuery),
	function (l) {
		"use strict";
		var e = {};

		function t() {
			m(), i()
		}

		function a() {
			n().init()
		}

		function d() {
			i()
		}

		function o() {
			n().scroll()
		}

		function m() {
			var e = l("audio.mkdf-blog-audio");
			e.length && e.mediaelementplayer({
				audioWidth: "100%"
			})
		}

		function i() {
			var e = l(".mkdf-blog-holder.mkdf-blog-type-masonry");
			e.length && e.each(function () {
				var e = l(this),
					t = e.children(".mkdf-blog-holder-inner"),
					a = e.find(".mkdf-blog-masonry-grid-sizer").width();
				t.waitForImages(function () {
					t.isotope({
						layoutMode: "packery",
						itemSelector: "article",
						percentPosition: !0,
						packery: {
							gutter: ".mkdf-blog-masonry-grid-gutter",
							columnWidth: ".mkdf-blog-masonry-grid-sizer"
						}
					}), mkdf.modules.common.setFixedImageProportionSize(e, e.find("article"), a), t.isotope("layout").css("opacity", "1")
				})
			})
		}

		function n() {
			function t(e) {
				var t = e.outerHeight() + e.offset().top - mkdfGlobalVars.vars.mkdfAddForAdminBar;
				!e.hasClass("mkdf-blog-pagination-infinite-scroll-started") && mkdf.scroll + mkdf.windowHeight > t && a(e)
			}
			var e = l(".mkdf-blog-holder"),
				a = function (a) {
					var d, e, o = a.children(".mkdf-blog-holder-inner");
					void 0 !== a.data("max-num-pages") && !1 !== a.data("max-num-pages") && (e = a.data("max-num-pages")), a.hasClass("mkdf-blog-pagination-infinite-scroll") && a.addClass("mkdf-blog-pagination-infinite-scroll-started");
					var t = mkdf.modules.common.getLoadMoreData(a),
						i = a.find(".mkdf-blog-pag-loading");
					if ((d = t.nextPage) <= e) {
						i.addClass("mkdf-showing");
						var n = mkdf.modules.common.setLoadMoreAjaxData(t, "fiorello_mikado_blog_load_more");
						l.ajax({
							type: "POST",
							data: n,
							url: mkdfGlobalVars.vars.mkdfAjaxUrl,
							success: function (e) {
								d++, a.data("next-page", d);
								var t = l.parseJSON(e).html;
								a.waitForImages(function () {
									a.hasClass("mkdf-blog-type-masonry") ? (s(o, i, t), mkdf.modules.common.setFixedImageProportionSize(a, a.find("article"), size)) : r(o, i, t), setTimeout(function () {
										m(), mkdf.modules.common.mkdfOwlSlider(), mkdf.modules.common.mkdfFluidVideo(), mkdf.modules.common.mkdfInitSelfHostedVideoPlayer(), mkdf.modules.common.mkdfSelfHostedVideoSize(), "function" == typeof mkdf.modules.common.mkdfStickySidebarWidget && mkdf.modules.common.mkdfStickySidebarWidget().reInit(), l(document.body).trigger("blog_list_load_more_trigger")
									}, 400)
								}), a.hasClass("mkdf-blog-pagination-infinite-scroll-started") && a.removeClass("mkdf-blog-pagination-infinite-scroll-started")
							}
						})
					}
					d === e && a.find(".mkdf-blog-pag-load-more").hide()
				},
				s = function (e, t, a) {
					e.append(a).isotope("reloadItems").isotope({
						sortBy: "original-order"
					}), t.removeClass("mkdf-showing"), setTimeout(function () {
						e.isotope("layout")
					}, 600)
				},
				r = function (e, t, a) {
					t.removeClass("mkdf-showing"), e.append(a)
				};
			return {
				init: function () {
					e.length && e.each(function () {
						var e = l(this);
						e.hasClass("mkdf-blog-pagination-load-more") && function (t) {
							t.find(".mkdf-blog-pag-load-more a").on("click", function (e) {
								e.preventDefault(), e.stopPropagation(), a(t)
							})
						}(e), e.hasClass("mkdf-blog-pagination-infinite-scroll") && t(e)
					})
				},
				scroll: function () {
					e.length && e.each(function () {
						var e = l(this);
						e.hasClass("mkdf-blog-pagination-infinite-scroll") && t(e)
					})
				}
			}
		} (mkdf.modules.blog = e).mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, e.mkdfOnWindowResize = d, e.mkdfOnWindowScroll = o, l(document).ready(t), l(window).on("load", a), l(window).resize(d), l(window).scroll(o)
	}(jQuery),
	function (o) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				if (o("body:not(.error404) .mkdf-footer-uncover").length && !mkdf.htmlEl.hasClass("touch")) {
					var e = o("footer"),
						t = e.outerHeight(),
						a = o(".mkdf-content"),
						d = function () {
							a.css("margin-bottom", t), e.css("height", t)
						};
					d(), o(window).resize(function () {
						t = e.find(".mkdf-footer-inner").outerHeight(), d()
					})
				}
			}()
		} (mkdf.modules.footer = e).mkdfOnWindowLoad = t, o(window).on("load", t)
	}(jQuery),
	function (l) {
		"use strict";
		var e = {};

		function t() {
			d(), setTimeout(function () {
				l(".mkdf-drop-down > ul > li").each(function () {
					var n = l(this);
					n.find(".second").length && n.waitForImages(function () {
						var e = n.find(".second"),
							t = mkdf.menuDropdownHeightSet ? 0 : e.outerHeight();
						if (n.hasClass("wide")) {
							var a = 0,
								d = e.find("> .inner > ul > li");
							d.each(function () {
								var e = l(this).outerHeight();
								a < e && (a = e)
							}), d.css("height", "").height(a), mkdf.menuDropdownHeightSet || (t = e.outerHeight())
						}
						if (mkdf.menuDropdownHeightSet || e.height(0), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) n.on("touchstart mouseenter", function () {
							e.css({
								height: t,
								overflow: "visible",
								visibility: "visible",
								opacity: "1"
							})
						}).on("mouseleave", function () {
							e.css({
								height: "0px",
								overflow: "hidden",
								visibility: "hidden",
								opacity: "0"
							})
						});
						else if (mkdf.body.hasClass("mkdf-dropdown-animate-height")) {
							var o = {
								interval: 0,
								over: function () {
									setTimeout(function () {
										e.addClass("mkdf-drop-down-start").css({
											visibility: "visible",
											height: "0",
											opacity: "1"
										}), e.stop().animate({
											height: t
										}, 400, "easeInOutQuint", function () {
											e.css("overflow", "visible")
										})
									}, 100)
								},
								timeout: 100,
								out: function () {
									e.stop().animate({
										height: "0",
										opacity: 0
									}, 100, function () {
										e.css({
											overflow: "hidden",
											visibility: "hidden"
										})
									}), e.removeClass("mkdf-drop-down-start")
								}
							};
							n.hoverIntent(o)
						} else {
							var i = {
								interval: 0,
								over: function () {
									setTimeout(function () {
										e.addClass("mkdf-drop-down-start").stop().css({
											height: t
										})
									}, 150)
								},
								timeout: 150,
								out: function () {
									e.stop().css({
										height: "0"
									}).removeClass("mkdf-drop-down-start")
								}
							};
							n.hoverIntent(i)
						}
					})
				}), l(".mkdf-drop-down ul li.wide ul li a").on("click", function (e) {
					if (1 === e.which) {
						var t = l(this);
						setTimeout(function () {
							t.mouseleave()
						}, 500)
					}
				}), mkdf.menuDropdownHeightSet = !0
			}, 100)
		}

		function a() {
			o()
		}

		function d() {
			var e = l(".mkdf-drop-down > ul > li.narrow.menu-item-has-children");
			e.length && e.each(function (e) {
				var t, a = l(this),
					d = a.offset().left,
					o = a.find(".second"),
					i = o.find(".inner ul"),
					n = i.outerWidth(),
					s = mkdf.windowWidth - d;
				mkdf.body.hasClass("mkdf-boxed") && (s = mkdf.boxedLayoutWidth - (d - (mkdf.windowWidth - mkdf.boxedLayoutWidth) / 2)), 0 < a.find("li.sub").length && (t = s - n), o.removeClass("right"), i.removeClass("right"), (s < n || t < n) && (o.addClass("right"), i.addClass("right"))
			})
		}

		function o() {
			var r = l(".mkdf-drop-down > ul > li.wide");
			r.length && r.each(function (e) {
				var t = l(this),
					a = l(r[e]).find(".second");
				if (a.length && !t.hasClass("left_position") && !t.hasClass("right_position"))
					if (t.hasClass("mkdf-wide-menu-full-width") || t.hasClass("mkdf-wide-menu-in-grid"))
						if (a.css("left", 0), mkdf.body.hasClass("mkdf-boxed")) {
							var d = l(".mkdf-boxed .mkdf-wrapper .mkdf-wrapper-inner").outerWidth();
							o = a.offset().left - (mkdf.windowWidth - d) / 2, a.css({
								left: -o,
								width: d
							})
						} else o = t.hasClass("mkdf-wide-menu-full-width") ? (i = mkdf.windowWidth, a.offset().left) : (i = a.find(".inner>ul").outerWidth(), a.offset().left - (mkdf.windowWidth - i) / 2), a.css({
							left: -o,
							width: i
						});
					else if (t.hasClass("mkdf-wide-menu-centered")) {
						var o, i, n, s = (o = a.offset().left) - (i = a.find(".inner>ul").outerWidth()) / 2 + t.outerWidth() / 2;
						n = s <= 40 ? 40 - o : s + i > mkdf.windowWidth - 40 ? mkdf.windowWidth - 40 - o - i : -i / 2 + t.outerWidth() / 2, a.css({
							left: n
						})
					}
			})
		} (mkdf.modules.header = e).mkdfSetDropDownMenuPosition = d, e.mkdfSetDropDownWideMenuPosition = o, e.mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, l(document).ready(t), l(window).on("load", a)
	}(jQuery),
	function (o) {
		"use strict";

		function e() {
			o(document).on("click", ".mkdf-like", function () {
				var e, t = o(this),
					a = t.attr("id");
				if (t.hasClass("liked")) return !1;
				void 0 !== t.data("type") && (e = t.data("type"));
				var d = {
					action: "fiorello_mikado_like",
					likes_id: a,
					type: e
				};
				return o.post(mkdfGlobalVars.vars.mkdfAjaxUrl, d, function (e) {
					t.html(e).addClass("liked").attr("title", "You already like this!")
				}), !1
			})
		}
		o(document).ready(e)
	}(jQuery),
	function (m) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				var d, o = m(".mkdf-wrapper"),
					i = m(".mkdf-side-menu"),
					n = m("a.mkdf-side-menu-button-opener"),
					s = !1,
					r = !1,
					l = !1;
				mkdf.body.hasClass("mkdf-side-menu-slide-from-right") ? (m(".mkdf-cover").remove(), d = "mkdf-right-side-menu-opened", o.prepend('<div class="mkdf-cover"/>'), s = !0) : mkdf.body.hasClass("mkdf-side-menu-slide-with-content") ? (d = "mkdf-side-menu-open", r = !0) : mkdf.body.hasClass("mkdf-side-area-uncovered-from-content") && (d = "mkdf-right-side-menu-opened", l = !0);
				m("a.mkdf-side-menu-button-opener, a.mkdf-close-side-menu").on("click", function (e) {
					if (e.preventDefault(), n.hasClass("opened")) {
						if (n.removeClass("opened"), mkdf.body.removeClass(d), l) var t = setTimeout(function () {
							i.css({
								visibility: "hidden"
							}), clearTimeout(t)
						}, 400)
					} else {
						n.addClass("opened"), mkdf.body.addClass(d), s && m(".mkdf-wrapper .mkdf-cover").on("click", function () {
							mkdf.body.removeClass("mkdf-right-side-menu-opened"), n.removeClass("opened")
						}), l && i.css({
							visibility: "visible"
						});
						var a = m(window).scrollTop();
						m(window).scroll(function () {
							if (400 < Math.abs(mkdf.scroll - a) && (mkdf.body.removeClass(d), n.removeClass("opened"), l)) var e = setTimeout(function () {
								i.css({
									visibility: "hidden"
								}), clearTimeout(e)
							}, 400)
						})
					}
					r && (e.stopPropagation(), o.on("click", function () {
						e.preventDefault(), n.removeClass("opened"), mkdf.body.removeClass("mkdf-side-menu-open")
					}))
				})
			}(),
				function () {
					var e = m(".mkdf-side-menu");
					e.length && e.perfectScrollbar({
						wheelSpeed: .6,
						suppressScrollX: !0
					})
				}()
		} (mkdf.modules.sidearea = e).mkdfOnDocumentReady = t, m(document).ready(t)
	}(jQuery),
	function (s) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				var e = s(".mkdf-title-holder.mkdf-bg-parallax");
				if (0 < e.length && 1024 < mkdf.windowWidth) {
					var t = e.hasClass("mkdf-bg-parallax-zoom-out"),
						a = parseInt(e.data("height")),
						d = parseInt(e.data("background-width")),
						o = a / 1e4 * 7,
						i = -mkdf.scroll * o,
						n = mkdfGlobalVars.vars.mkdfAddForAdminBar;
					e.css({
						"background-position": "center " + (i + n) + "px"
					}), t && e.css({
						"background-size": d - mkdf.scroll + "px auto"
					}), s(window).scroll(function () {
						i = -mkdf.scroll * o, e.css({
							"background-position": "center " + (i + n) + "px"
						}), t && e.css({
							"background-size": d - mkdf.scroll + "px auto"
						})
					})
				}
			}()
		} (mkdf.modules.title = e).mkdfOnDocumentReady = t, s(document).ready(t)
	}(jQuery),
	function (r) {
		"use strict";
		var e = {};

		function t() {
			r(document).on("click", ".mkdf-quantity-minus, .mkdf-quantity-plus", function (e) {
				e.stopPropagation();
				var t, a = r(this),
					d = a.siblings(".mkdf-quantity-input"),
					o = parseFloat(d.data("step")),
					i = parseFloat(d.data("max")),
					n = !1,
					s = parseFloat(d.val());
				a.hasClass("mkdf-quantity-minus") && (n = !0), n ? 1 <= (t = s - o) ? d.val(t) : d.val(0) : (t = s + o, void 0 === i ? d.val(t) : i <= t ? d.val(i) : d.val(t)), d.trigger("change")
			}),
				function () {
					var e = r(".woocommerce-ordering .orderby");
					e.length && e.select2({
						minimumResultsForSearch: 1 / 0
					});
					var t = r(".mkdf-woocommerce-page .mkdf-content .variations td.value select");
					t.length && t.select2();
					var a = r("#calc_shipping_country");
					a.length && a.select2();
					var d = r(".cart-collaterals .shipping select#calc_shipping_state");
					d.length && d.select2()
				}(),
				function () {
					var e = r(".mkdf-woo-single-page.mkdf-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image");
					e.length && (e.children("a").attr("data-rel", "prettyPhoto[woo_single_pretty_photo]"), "function" == typeof mkdf.modules.common.mkdfPrettyPhoto && mkdf.modules.common.mkdfPrettyPhoto())
				}(),
				function () {
					var t = r(".mkdf-pl-holder"),
						a = {},
						d = function (d, o) {
							var i = d.find(".mkdf-pl-outer"),
								e = mkdf.modules.common.getLoadMoreData(d),
								n = d.find(".mkdf-prl-loading");
							! function (e, t) {
								for (var a in t) e[a] = t[a];
								switch (e.ordering) {
									case "menu_order":
										e.metaKey = "", e.order = "asc", e.orderby = "menu_order title";
										break;
									case "popularity":
										e.metaKey = "total_sales", e.order = "desc", e.orderby = "meta_value_num";
										break;
									case "rating":
										e.metaKey = "_wc_average_rating", e.order = "desc", e.orderby = "meta_value_num";
										break;
									case "newness":
										e.metaKey = "", e.order = "desc", e.orderby = "date";
										break;
									case "price":
										e.metaKey = "_price", e.order = "asc", e.orderby = "meta_value_num";
										break;
									case "price-desc":
										e.metaKey = "_price", e.order = "desc", e.orderby = "meta_value_num"
								}
							}(a, o.data()), e.category = void 0 !== a.category ? a.category : "", e.metaKey = void 0 !== a.metaKey ? a.metaKey : "", e.order = void 0 !== a.order ? a.order : "", e.orderby = void 0 !== a.orderby ? a.orderby : "", e.minPrice = void 0 !== a.minprice ? a.minprice : "", e.maxPrice = void 0 !== a.maxprice ? a.maxprice : "", n.fadeIn();
							var t = mkdf.modules.common.setLoadMoreAjaxData(e, "fiorello_mikado_product_ajax_load_category");
							r.ajax({
								type: "POST",
								data: t,
								url: mkdfGlobalVars.vars.mkdfAjaxUrl,
								success: function (e) {
									var t = e,
										a = t;
									d.waitForImages(function () {
										o.parent().siblings().find("a").removeClass("active"), o.addClass("active"), d.hasClass("mkdf-masonry-layout") ? function (e, t, a) {
											e.find(".mkdf-pli").remove(), e.append(a).isotope("reloadItems").isotope({
												sortBy: "original-order"
											}), mkdfProductImageSizes(e), setTimeout(function () {
												e.isotope("layout"), t.fadeOut()
											}, 400)
										}(i, n, a) : function (e, t, a) {
											e.html(a), t.fadeOut()
										}(i, n, a)
									})
								}
							})
						},
						o = function (e, t) {
							e.on("click", function () {
								mkdf.windowWidth <= 768 && (e.hasClass("opened") ? (e.removeClass("opened"), t.slideUp()) : (e.addClass("opened"), t.slideDown()))
							})
						};
					return {
						init: function (e) {
							t.length && t.each(function () {
								var e = r(this);
								! function (a) {
									a.find(".mkdf-pl-categories a, .mkdf-pl-ordering a").on("click", function (e) {
										e.preventDefault(), e.stopPropagation();
										var t = r(this);
										t.hasClass("active") || d(a, t)
									})
								}(e), o(e.find(".mkdf-pl-ordering-outer h6"), e.find(".mkdf-pl-ordering")), o(e.find(".mkdf-pl-categories-label"), e.find(".mkdf-pl-categories-label").next("ul"))
							})
						}
					}
				}().init()
		}

		function a() {
			o()
		}

		function d() {
			o()
		}

		function o() {
			var e = r(".mkdf-pl-holder.mkdf-masonry-layout .mkdf-pl-outer");
			e.length && e.each(function () {
				var e = r(this),
					t = e.find(".mkdf-pl-sizer").width();
				e.waitForImages(function () {
					e.isotope({
						itemSelector: ".mkdf-pli",
						resizable: !1,
						masonry: {
							columnWidth: ".mkdf-pl-sizer",
							gutter: ".mkdf-pl-gutter"
						}
					}), e.find(".mkdf-woo-fixed-masonry").length && mkdf.modules.common.setFixedImageProportionSize(e, e.find(".mkdf-pli"), t, !0), e.isotope("layout").css("opacity", 1)
				})
			})
		} (mkdf.modules.woocommerce = e).mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, e.mkdfOnWindowResize = d, r(document).ready(t), r(window).on("load", a), r(window).resize(d)
	}(jQuery),
	function (u) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				var e = u(".mkdf-blog-list-holder.mkdf-bl-masonry");
				e.length && e.each(function () {
					var e = u(this),
						t = e.find(".mkdf-blog-list");
					t.waitForImages(function () {
						t.isotope({
							layoutMode: "packery",
							itemSelector: ".mkdf-bl-item",
							percentPosition: !0,
							packery: {
								gutter: ".mkdf-bl-grid-gutter",
								columnWidth: ".mkdf-bl-grid-sizer"
							}
						}), t.css("opacity", "1")
					})
				})
			}()
		}

		function a() {
			o().init()
		}

		function d() {
			o().scroll()
		}

		function o() {
			function t(e) {
				var t = e.outerHeight() + e.offset().top - mkdfGlobalVars.vars.mkdfAddForAdminBar;
				!e.hasClass("mkdf-bl-pag-infinite-scroll-started") && mkdf.scroll + mkdf.windowHeight > t && o(e)
			}
			var e = u(".mkdf-blog-list-holder"),
				o = function (a, e) {
					var d, o, i = a.find(".mkdf-blog-list");
					void 0 !== a.data("max-num-pages") && !1 !== a.data("max-num-pages") && (o = a.data("max-num-pages")), a.hasClass("mkdf-bl-pag-standard-shortcodes") && a.data("next-page", e), a.hasClass("mkdf-bl-pag-infinite-scroll") && a.addClass("mkdf-bl-pag-infinite-scroll-started");
					var t = mkdf.modules.common.getLoadMoreData(a),
						n = a.find(".mkdf-blog-pag-loading");
					if ((d = t.nextPage) <= o) {
						a.hasClass("mkdf-bl-pag-standard-shortcodes") ? (n.addClass("mkdf-showing mkdf-standard-pag-trigger"), a.addClass("mkdf-bl-pag-standard-shortcodes-animate")) : n.addClass("mkdf-showing");
						var s = mkdf.modules.common.setLoadMoreAjaxData(t, "fiorello_mikado_blog_shortcode_load_more");
						u.ajax({
							type: "POST",
							data: s,
							url: mkdfGlobalVars.vars.mkdfAjaxUrl,
							success: function (e) {
								a.hasClass("mkdf-bl-pag-standard-shortcodes") || d++, a.data("next-page", d);
								var t = u.parseJSON(e).html;
								a.hasClass("mkdf-bl-pag-standard-shortcodes") ? (r(a, o, d), a.waitForImages(function () {
									a.hasClass("mkdf-bl-masonry") ? l(a, i, n, t) : (m(a, i, n, t), "function" == typeof mkdf.modules.common.mkdfStickySidebarWidget && mkdf.modules.common.mkdfStickySidebarWidget().reInit())
								})) : a.waitForImages(function () {
									a.hasClass("mkdf-bl-masonry") ? f(i, n, t) : (c(i, n, t), "function" == typeof mkdf.modules.common.mkdfStickySidebarWidget && mkdf.modules.common.mkdfStickySidebarWidget().reInit())
								}), a.hasClass("mkdf-bl-pag-infinite-scroll-started") && a.removeClass("mkdf-bl-pag-infinite-scroll-started")
							}
						})
					}
					d === o && a.find(".mkdf-blog-pag-load-more").hide()
				},
				r = function (e, t, a) {
					var d = e.find(".mkdf-bl-standard-pagination"),
						o = d.find("li.mkdf-bl-pag-number"),
						i = d.find("li.mkdf-bl-pag-prev a"),
						n = d.find("li.mkdf-bl-pag-next a");
					o.removeClass("mkdf-bl-pag-active"), o.eq(a - 1).addClass("mkdf-bl-pag-active"), i.data("paged", a - 1), n.data("paged", a + 1), 1 < a ? i.css({
						opacity: "1"
					}) : i.css({
						opacity: "0"
					}), a === t ? n.css({
						opacity: "0"
					}) : n.css({
						opacity: "1"
					})
				},
				l = function (e, t, a, d) {
					t.html(d).isotope("reloadItems").isotope({
						sortBy: "original-order"
					}), a.removeClass("mkdf-showing mkdf-standard-pag-trigger"), e.removeClass("mkdf-bl-pag-standard-shortcodes-animate"), setTimeout(function () {
						t.isotope("layout"), "function" == typeof mkdf.modules.common.mkdfStickySidebarWidget && mkdf.modules.common.mkdfStickySidebarWidget().reInit()
					}, 600)
				},
				m = function (e, t, a, d) {
					a.removeClass("mkdf-showing mkdf-standard-pag-trigger"), e.removeClass("mkdf-bl-pag-standard-shortcodes-animate"), t.html(d)
				},
				f = function (e, t, a) {
					e.append(a).isotope("reloadItems").isotope({
						sortBy: "original-order"
					}), t.removeClass("mkdf-showing"), setTimeout(function () {
						e.isotope("layout"), "function" == typeof mkdf.modules.common.mkdfStickySidebarWidget && mkdf.modules.common.mkdfStickySidebarWidget().reInit()
					}, 600)
				},
				c = function (e, t, a) {
					t.removeClass("mkdf-showing"), e.append(a)
				};
			return {
				init: function () {
					e.length && e.each(function () {
						var e = u(this);
						e.hasClass("mkdf-bl-pag-standard-shortcodes") && function (d) {
							var e = d.find(".mkdf-bl-standard-pagination li");
							e.length && e.each(function () {
								var t = u(this).children("a"),
									a = 1;
								t.on("click", function (e) {
									e.preventDefault(), e.stopPropagation(), void 0 !== t.data("paged") && !1 !== t.data("paged") && (a = t.data("paged")), o(d, a)
								})
							})
						}(e), e.hasClass("mkdf-bl-pag-load-more") && function (t) {
							t.find(".mkdf-blog-pag-load-more a").on("click", function (e) {
								e.preventDefault(), e.stopPropagation(), o(t)
							})
						}(e), e.hasClass("mkdf-bl-pag-infinite-scroll") && t(e)
					})
				},
				scroll: function () {
					e.length && e.each(function () {
						var e = u(this);
						e.hasClass("mkdf-bl-pag-infinite-scroll") && t(e)
					})
				}
			}
		} (mkdf.modules.blogListSC = e).mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, e.mkdfOnWindowScroll = d, u(document).ready(t), u(window).on("load", a), u(window).scroll(d)
	}(jQuery),
	function (e) {
		"use strict";
		var t = {};

		function a() {
			o()
		}

		function d() {
			o()
		}

		function o() {
			if (mkdf.body.hasClass("mkdf-header-divided")) {
				var t = e(".mkdf-menu-area, .mkdf-sticky-header"),
					a = t.width(),
					d = e(".mkdf-main-menu > ul > li > a"),
					o = 0,
					i = parseInt(t.children(".mkdf-vertical-align-containers").css("paddingLeft"), 10),
					n = t.find(".mkdf-logo-wrapper .mkdf-normal-logo"),
					s = 0;
				t.waitForImages(function () {
					t.find(".mkdf-grid").length && (a = t.find(".mkdf-grid").outerWidth()), d.length && (o = parseInt(d.css("paddingLeft"))), n.length && (s = n.width() / 2);
					var e = Math.round(a / 2 - o - s - i);
					t.find(".mkdf-position-left").width(e), t.find(".mkdf-position-right").width(e), t.css("opacity", 1), "function" == typeof mkdf.modules.header.mkdfSetDropDownMenuPosition && mkdf.modules.header.mkdfSetDropDownMenuPosition(), "function" == typeof mkdf.modules.header.mkdfSetDropDownWideMenuPosition && mkdf.modules.header.mkdfSetDropDownWideMenuPosition()
				})
			}
		} (mkdf.modules.headerDivided = t).mkdfOnDocumentReady = a, t.mkdfOnWindowResize = d, e(document).ready(a), e(window).resize(d)
	}(jQuery),
	function (s) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				var e = s(".mkdf-mobile-header .mkdf-mobile-menu-opener, .mkdf-close-mobile-side-area-holder"),
					n = s(".mkdf-mobile-header .mkdf-mobile-side-area"),
					t = s('.mkdf-mobile-nav .mobile_arrow, .mkdf-mobile-nav h6, .mkdf-mobile-nav a[href*="#"]');
				e.length && n.length && e.on("tap click", function (e) {
					e.stopPropagation(), e.preventDefault(), n.hasClass("opened") ? n.removeClass("opened") : n.addClass("opened")
				});
				t.length && t.each(function () {
					var o = s(this),
						i = n.outerHeight();
					o.on("tap click", function (e) {
						var t = o.parent("li"),
							a = t.siblings(".menu-item-has-children");
						if (t.hasClass("has_sub")) {
							var d = t.find("> ul.sub_menu");
							d.is(":visible") ? (d.slideUp(450, "easeInOutQuint"), t.removeClass("mkdf-opened"), n.stop().animate({
								height: i
							}, 300)) : (t.addClass("mkdf-opened"), 0 === a.length ? t.find(".sub_menu").slideUp(400, "easeInOutQuint", function () {
								d.slideDown(400, "easeInOutQuint"), n.stop().animate({
									height: i + 50
								}, 300)
							}) : t.siblings().removeClass("mkdf-opened").find(".sub_menu").slideUp(400, "easeInOutQuint", function () {
								d.slideDown(400, "easeInOutQuint"), n.stop().animate({
									height: i + 50
								}, 300)
							}))
						}
					})
				});
				s(".mkdf-mobile-nav a, .mkdf-mobile-logo-wrapper a").on("click tap", function (e) {
					"http://#" !== s(this).attr("href") && s(this).attr("href")
				})
			}(), d(),
				function () {
					var t = s(".mkdf-mobile-header"),
						e = (t.find(".mkdf-mobile-menu-opener"), t.length ? t.outerHeight() : 0),
						a = s(".mkdf-mobile-header .mkdf-mobile-side-area");
					mkdf.body.hasClass("mkdf-content-is-behind-header") && 0 < e && mkdf.windowWidth <= 1024 && s(".mkdf-content").css("marginTop", -e);
					if (mkdf.body.hasClass("mkdf-sticky-up-mobile-header")) {
						var d, o = s("#wpadminbar"),
							i = s(document).scrollTop();
						d = e + mkdfGlobalVars.vars.mkdfAddForAdminBar, s(window).scroll(function () {
							var e = s(document).scrollTop();
							d < e && !a.hasClass("opened") ? t.addClass("mkdf-animate-mobile-header") : t.removeClass("mkdf-animate-mobile-header"), i < e && d < e || e < d || a.hasClass("opened") ? (t.removeClass("mobile-header-appear"), t.css("margin-bottom", 0), o.length && t.find(".mkdf-mobile-header-inner").css("top", 0)) : (t.addClass("mobile-header-appear"), t.css("margin-bottom", d)), i = s(document).scrollTop()
						})
					}
				}()
		}

		function a() {
			d()
		}

		function d() {
			if (mkdf.windowWidth <= 1024) {
				var e = s(".mkdf-mobile-header").find(".mkdf-mobile-side-area-inner"),
					t = e.outerHeight(),
					a = mkdf.windowHeight - 100,
					d = a < t ? a : t;
				e.height(d).perfectScrollbar({
					wheelSpeed: .6,
					suppressScrollX: !0
				})
			}
		} (mkdf.modules.mobileHeader = e).mkdfOnDocumentReady = t, e.mkdfOnWindowResize = a, s(document).ready(t), s(window).resize(a)
	}(jQuery),
	function (f) {
		"use strict";
		var e = {};

		function t() {
			1024 < mkdf.windowWidth && function () {
				var t, e, a = f(".mkdf-page-header"),
					d = f(".mkdf-sticky-header"),
					o = f(".mkdf-fixed-wrapper"),
					i = o.children(".mkdf-menu-area").outerHeight(),
					n = f(".mkdf-slider"),
					s = n.length ? n.outerHeight() : 0,
					r = o.length ? o.offset().top - mkdfGlobalVars.vars.mkdfAddForAdminBar : 0;
				switch (!0) {
					case mkdf.body.hasClass("mkdf-sticky-header-on-scroll-up"):
						mkdf.modules.stickyHeader.behaviour = "mkdf-sticky-header-on-scroll-up";
						var l = f(document).scrollTop();
						t = parseInt(mkdfGlobalVars.vars.mkdfTopBarHeight) + parseInt(mkdfGlobalVars.vars.mkdfLogoAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfMenuAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfStickyHeaderHeight), (e = function () {
							var e = f(document).scrollTop();
							l < e && t < e || e < t ? (mkdf.modules.stickyHeader.isStickyVisible = !1, d.removeClass("header-appear").find(".mkdf-main-menu .second").removeClass("mkdf-drop-down-start"), mkdf.body.removeClass("mkdf-sticky-header-appear")) : (mkdf.modules.stickyHeader.isStickyVisible = !0, d.addClass("header-appear"), mkdf.body.addClass("mkdf-sticky-header-appear")), l = f(document).scrollTop()
						})(), f(window).scroll(function () {
							e()
						});
						break;
					case mkdf.body.hasClass("mkdf-sticky-header-on-scroll-down-up"):
						mkdf.modules.stickyHeader.behaviour = "mkdf-sticky-header-on-scroll-down-up", 0 !== mkdfPerPageVars.vars.mkdfStickyScrollAmount ? mkdf.modules.stickyHeader.stickyAppearAmount = parseInt(mkdfPerPageVars.vars.mkdfStickyScrollAmount) : mkdf.modules.stickyHeader.stickyAppearAmount = parseInt(mkdfGlobalVars.vars.mkdfTopBarHeight) + parseInt(mkdfGlobalVars.vars.mkdfLogoAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfMenuAreaHeight) + parseInt(s), (e = function () {
							mkdf.scroll < mkdf.modules.stickyHeader.stickyAppearAmount ? (mkdf.modules.stickyHeader.isStickyVisible = !1, d.removeClass("header-appear").find(".mkdf-main-menu .second").removeClass("mkdf-drop-down-start"), mkdf.body.removeClass("mkdf-sticky-header-appear")) : (mkdf.modules.stickyHeader.isStickyVisible = !0, d.addClass("header-appear"), mkdf.body.addClass("mkdf-sticky-header-appear"))
						})(), f(window).scroll(function () {
							e()
						});
						break;
					case mkdf.body.hasClass("mkdf-fixed-on-scroll"):
						mkdf.modules.stickyHeader.behaviour = "mkdf-fixed-on-scroll";
						var m = function () {
							mkdf.scroll < r ? (o.removeClass("fixed"), mkdf.body.removeClass("mkdf-fixed-header-appear"), a.css("margin-bottom", "0")) : (o.addClass("fixed"), mkdf.body.addClass("mkdf-fixed-header-appear"), a.css("margin-bottom", i + "px"))
						};
						m(), f(window).scroll(function () {
							m()
						})
				}
			}()
		} (mkdf.modules.stickyHeader = e).isStickyVisible = !1, e.stickyAppearAmount = 0, e.behaviour = "", e.mkdfOnDocumentReady = t, f(document).ready(t)
	}(jQuery),
	function (c) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				if (mkdf.body.hasClass("mkdf-search-covers-header")) {
					var e = c("a.mkdf-search-opener");
					0 < e.length && e.on("click", function (e) {
						e.preventDefault();
						var t, a = c(this),
							d = c(".mkdf-page-header"),
							o = c(".mkdf-top-bar"),
							i = d.find(".mkdf-fixed-wrapper.fixed"),
							n = c(".mkdf-mobile-header"),
							s = c(".mkdf-search-cover"),
							r = !!a.parents(".mkdf-top-bar").length,
							l = !!a.parents(".mkdf-fixed-wrapper.fixed").length,
							m = !!a.parents(".mkdf-sticky-header").length,
							f = !!a.parents(".mkdf-mobile-header").length;
						s.removeClass("mkdf-is-active"), r ? (t = mkdfGlobalVars.vars.mkdfTopBarHeight, o.find(".mkdf-search-cover").addClass("mkdf-is-active")) : l ? (t = i.outerHeight(), d.children(".mkdf-search-cover").addClass("mkdf-is-active")) : m ? (t = d.find(".mkdf-sticky-header").outerHeight(), d.children(".mkdf-search-cover").addClass("mkdf-is-active")) : f ? (t = n.hasClass("mobile-header-appear") ? n.children(".mkdf-mobile-header-inner").outerHeight() : n.outerHeight(), n.find(".mkdf-search-cover").addClass("mkdf-is-active")) : (t = d.outerHeight(), d.children(".mkdf-search-cover").addClass("mkdf-is-active")), s.hasClass("mkdf-is-active") && s.height(t).stop(!0).fadeIn(600).find('input[type="text"]').focus(), s.find(".mkdf-search-close").on("click", function (e) {
							e.preventDefault(), s.stop(!0).fadeOut(450)
						}), s.blur(function () {
							s.stop(!0).fadeOut(450)
						}), c(window).scroll(function () {
							s.stop(!0).fadeOut(450)
						})
					})
				}
			}()
		} (mkdf.modules.searchCoversHeader = e).mkdfOnDocumentReady = t, c(document).ready(t)
	}(jQuery),
	function (i) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				if (mkdf.body.hasClass("mkdf-fullscreen-search")) {
					var e = i("a.mkdf-search-opener");
					if (0 < e.length) {
						var a = i(".mkdf-fullscreen-search-holder"),
							t = i(".mkdf-search-close");
						e.on("click", function (e) {
							e.preventDefault(), a.hasClass("mkdf-animate") ? (mkdf.body.removeClass("mkdf-fullscreen-search-opened mkdf-search-fade-out"), mkdf.body.removeClass("mkdf-search-fade-in"), a.removeClass("mkdf-animate"), setTimeout(function () {
								a.find(".mkdf-search-field").val(""), a.find(".mkdf-search-field").blur()
							}, 300), mkdf.modules.common.mkdfEnableScroll()) : (mkdf.body.addClass("mkdf-fullscreen-search-opened mkdf-search-fade-in"), mkdf.body.removeClass("mkdf-search-fade-out"), a.addClass("mkdf-animate"), setTimeout(function () {
								a.find(".mkdf-search-field").focus()
							}, 900), mkdf.modules.common.mkdfDisableScroll()), t.on("click", function (e) {
								e.preventDefault(), mkdf.body.removeClass("mkdf-fullscreen-search-opened mkdf-search-fade-in"), mkdf.body.addClass("mkdf-search-fade-out"), a.removeClass("mkdf-animate"), setTimeout(function () {
									a.find(".mkdf-search-field").val(""), a.find(".mkdf-search-field").blur()
								}, 300), mkdf.modules.common.mkdfEnableScroll()
							}), i(document).mouseup(function (e) {
								var t = i(".mkdf-form-holder-inner");
								t.is(e.target) || 0 !== t.has(e.target).length || (e.preventDefault(), mkdf.body.removeClass("mkdf-fullscreen-search-opened mkdf-search-fade-in"), mkdf.body.addClass("mkdf-search-fade-out"), a.removeClass("mkdf-animate"), setTimeout(function () {
									a.find(".mkdf-search-field").val(""), a.find(".mkdf-search-field").blur()
								}, 300), mkdf.modules.common.mkdfEnableScroll())
							}), i(document).keyup(function (e) {
								27 === e.keyCode && (mkdf.body.removeClass("mkdf-fullscreen-search-opened mkdf-search-fade-in"), mkdf.body.addClass("mkdf-search-fade-out"), a.removeClass("mkdf-animate"), setTimeout(function () {
									a.find(".mkdf-search-field").val(""), a.find(".mkdf-search-field").blur()
								}, 300), mkdf.modules.common.mkdfEnableScroll())
							})
						});
						var d = i(".mkdf-fullscreen-search-holder .mkdf-search-field"),
							o = i(".mkdf-fullscreen-search-holder .mkdf-field-holder .mkdf-line");
						d.focus(function () {
							o.css("width", "100%")
						}), d.blur(function () {
							o.css("width", "0")
						})
					}
				}
			}()
		} (mkdf.modules.searchFullscreen = e).mkdfOnDocumentReady = t, i(document).ready(t)
	}(jQuery),
	function (d) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				if (mkdf.body.hasClass("mkdf-fullscreen-search-with-sidebar")) {
					var e = d("a.mkdf-search-opener");
					if (0 < e.length) {
						var t = d(".mkdf-fullscreen-with-sidebar-search-holder"),
							a = d(".mkdf-search-close");
						e.on("click", function (e) {
							e.preventDefault(), t.perfectScrollbar({
								wheelSpeed: .6,
								suppressScrollX: !0
							}), t.hasClass("mkdf-animate") ? (mkdf.body.removeClass("mkdf-fullscreen-search-opened mkdf-search-fade-out"), mkdf.body.removeClass("mkdf-search-fade-in"), t.removeClass("mkdf-animate"), setTimeout(function () {
								t.find(".mkdf-search-field").val(""), t.find(".mkdf-search-field").blur()
							}, 300), mkdf.modules.common.mkdfEnableScroll()) : (mkdf.body.addClass("mkdf-fullscreen-search-opened mkdf-search-fade-in"), mkdf.body.removeClass("mkdf-search-fade-out"), t.addClass("mkdf-animate"), setTimeout(function () {
								t.find(".mkdf-search-field").focus()
							}, 900), mkdf.modules.common.mkdfDisableScroll()), a.on("click", function (e) {
								e.preventDefault(), mkdf.body.removeClass("mkdf-fullscreen-search-opened mkdf-search-fade-in"), mkdf.body.addClass("mkdf-search-fade-out"), t.removeClass("mkdf-animate"), setTimeout(function () {
									t.find(".mkdf-search-field").val(""), t.find(".mkdf-search-field").blur()
								}, 300), mkdf.modules.common.mkdfEnableScroll()
							}), d(document).keyup(function (e) {
								27 === e.keyCode && (mkdf.body.removeClass("mkdf-fullscreen-search-opened mkdf-search-fade-in"), mkdf.body.addClass("mkdf-search-fade-out"), t.removeClass("mkdf-animate"), setTimeout(function () {
									t.find(".mkdf-search-field").val(""), t.find(".mkdf-search-field").blur()
								}, 300), mkdf.modules.common.mkdfEnableScroll())
							})
						})
					}
				}
			}()
		} (mkdf.modules.searchFullscreenWithSidebar = e).mkdfOnDocumentReady = t, d(document).ready(t)
	}(jQuery),
	function (u) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				if (mkdf.body.hasClass("mkdf-slide-from-header-bottom")) {
					var e = u("a.mkdf-search-opener");
					0 < e.length && e.on("click", function (e) {
						e.preventDefault();
						var t = u(this),
							a = parseInt(mkdf.windowWidth - t.offset().left - t.outerWidth());
						mkdf.body.hasClass("mkdf-boxed") && 1024 < mkdf.windowWidth && (a -= parseInt((mkdf.windowWidth - u(".mkdf-boxed .mkdf-wrapper .mkdf-wrapper-inner").outerWidth()) / 2));
						var d = u(".mkdf-page-header"),
							o = "100%",
							i = u(".mkdf-top-bar"),
							n = d.find(".mkdf-fixed-wrapper.fixed"),
							s = u(".mkdf-mobile-header"),
							r = u(".mkdf-slide-from-header-bottom-holder"),
							l = !!t.parents(".mkdf-top-bar").length,
							m = !!t.parents(".mkdf-fixed-wrapper.fixed").length,
							f = !!t.parents(".mkdf-sticky-header").length,
							c = !!t.parents(".mkdf-mobile-header").length;
						r.removeClass("mkdf-is-active"), l ? i.find(".mkdf-slide-from-header-bottom-holder").addClass("mkdf-is-active") : m ? (o = n.outerHeight() + mkdfGlobalVars.vars.mkdfAddForAdminBar, d.children(".mkdf-slide-from-header-bottom-holder").addClass("mkdf-is-active")) : f ? (o = mkdfGlobalVars.vars.mkdfStickyHeaderHeight + mkdfGlobalVars.vars.mkdfAddForAdminBar, d.children(".mkdf-slide-from-header-bottom-holder").addClass("mkdf-is-active")) : c ? (s.hasClass("mobile-header-appear") && (o = s.children(".mkdf-mobile-header-inner").outerHeight() + mkdfGlobalVars.vars.mkdfAddForAdminBar), s.find(".mkdf-slide-from-header-bottom-holder").addClass("mkdf-is-active")) : d.children(".mkdf-slide-from-header-bottom-holder").addClass("mkdf-is-active"), r.hasClass("mkdf-is-active") && r.css({
							right: a,
							top: o
						}).stop(!0).slideToggle(300, "easeOutBack"), u(document).keyup(function (e) {
							27 === e.keyCode && r.stop(!0).fadeOut(0)
						}), u(window).scroll(function () {
							r.stop(!0).fadeOut(0)
						})
					})
				}
			}()
		} (mkdf.modules.searchSlideFromHB = e).mkdfOnDocumentReady = t, u(document).ready(t)
	}(jQuery),
	function (d) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				if (mkdf.body.hasClass("mkdf-search-slides-from-window-top")) {
					var e = d("a.mkdf-search-opener");
					if (0 < e.length) {
						var t = d(".mkdf-search-slide-window-top"),
							a = d(".mkdf-search-close");
						e.on("click", function (e) {
							e.preventDefault(), 0 === t.height() ? (d('.mkdf-search-slide-window-top input[type="text"]').focus(), mkdf.body.addClass("mkdf-search-open")) : mkdf.body.removeClass("mkdf-search-open"), d(window).scroll(function () {
								0 !== t.height() && 50 < mkdf.scroll && mkdf.body.removeClass("mkdf-search-open")
							}), a.on("click", function (e) {
								e.preventDefault(), mkdf.body.removeClass("mkdf-search-open")
							})
						})
					}
				}
			}()
		} (mkdf.modules.searchSlideFromWT = e).mkdfOnDocumentReady = t, d(document).ready(t)
	}(jQuery),
	function (i) {
		"use strict";
		i(document).ready(function () {
			! function () {
				var e = i(".mkdf-prod-cats-holder");
				e.length && e.each(function () {
					var a = i(this),
						e = a.find(".mkdf-prod-cat.mkdf-cat-with-image");
					a.waitForImages(function () {
						e.each(function (e) {
							var t = i(this);
							a.hasClass("mkdf-two-columns") ? (e + 1) % 4 == 1 ? t.next() : (e + 1) % 4 == 0 && t.prev() : (e + 1) % 6 == 1 ? t.next() : (e + 1) % 2 == 1 && t.prev()
						})
					})
				})
			}(),
				function () {
					var e = i(".mkdf-prod-cats-holder.mkdf-parallax-items");
					e.length && !mkdf.htmlEl.hasClass("touch") && (e.each(function () {
						var e = i(this),
							t = e.find(".mkdf-prod-cat"),
							o = e.attr("data-y-axis-translation");
						t.each(function () {
							var e = i(this),
								t = (e.outerHeight(), e.find(".mkdf-prod-cat-inner")),
								a = (t.height(), Math.floor(Math.random() * (o - o / 2 + 1) + o / 2)),
								d = '{"y":' + a + ', "smoothness":20}';
							t.attr("data-parallax", d)
						})
					}), setTimeout(function () {
						ParallaxScroll.init()
					}, 100))
				}()
		})
	}(jQuery),
	function (o) {
		"use strict";
		var e = {};

		function t() {
			o(document.body).on("blog_list_load_more_trigger", function () {
				d()
			})
		}

		function a() {
			d()
		}

		function d() {
			var e = o(".mkdf-blog-holder.mkdf-blog-masonry-gallery");
			e.length && e.each(function () {
				var e = o(this),
					t = e.find("article"),
					a = e.find(".mkdf-blog-pagination-holder"),
					d = 0;
				t.each(function () {
					var e = o(this);
					setTimeout(function () {
						e.appear(function () {
							7 === ++d && (d = 0), setTimeout(function () {
								e.addClass("mkdf-appeared")
							}, 200 * d)
						}, {
							accX: 0,
							accY: 0
						})
					}, 150)
				}), a.appear(function () {
					a.addClass("mkdf-appeared")
				}, {
					accX: 0,
					accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
				})
			})
		} (mkdf.modules.blogMasonryGallery = e).mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, o(document).ready(t), o(window).on("load", a)
	}(jQuery),
	function (r) {
		"use strict";
		var e = {};

		function t() {
			i()
		}

		function a() {
			o().init()
		}

		function d() {
			i()
		} (mkdf.modules.portfolio = e).mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, e.mkdfOnWindowResize = d, r(document).ready(t), r(window).on("load", a), r(window).resize(d);
		var o = function () {
			var t = r(".mkdf-follow-portfolio-info .mkdf-portfolio-single-holder .mkdf-ps-info-sticky-holder");
			if (t.length) var e = t.parent(),
				a = e.offset().top,
				d = e.height(),
				o = r(".mkdf-ps-image-holder").height(),
				i = r(".header-appear, .mkdf-fixed-wrapper"),
				n = i.length ? i.height() : 0,
				s = 30;
			return {
				init: function () {
					! function () {
						if (t.length && d <= o && mkdf.scroll >= a - n - mkdfGlobalVars.vars.mkdfAddForAdminBar - s) {
							var e = mkdf.scroll - a + mkdfGlobalVars.vars.mkdfAddForAdminBar + n + s;
							o < e + d && (e = o - d + s), t.stop().animate({
								marginTop: e
							})
						}
					}(), r(window).scroll(function () {
						t.length && d <= o && (0 < mkdf.scroll && i.length && (n = i.height()), mkdf.scroll >= a - n - mkdfGlobalVars.vars.mkdfAddForAdminBar - s ? mkdf.scroll + n + mkdfGlobalVars.vars.mkdfAddForAdminBar + s + d < a + o ? (t.stop().animate({
							marginTop: mkdf.scroll - a + mkdfGlobalVars.vars.mkdfAddForAdminBar + n + s
						}), n = 0) : t.stop().animate({
							marginTop: o - d
						}) : t.stop().animate({
							marginTop: 0
						}))
					})
				}
			}
		};

		function i() {
			var e = r(".mkdf-portfolio-single-holder .mkdf-ps-masonry-images").children();
			if (e.length) {
				var t = e.find(".mkdf-ps-grid-sizer").width(),
					a = 0 < e.find('.mkdf-ps-image[class*="mkdf-masonry-size-"]').length;
				e.waitForImages(function () {
					e.isotope({
						layoutMode: "packery",
						itemSelector: ".mkdf-ps-image",
						percentPosition: !0,
						packery: {
							gutter: ".mkdf-ps-grid-gutter",
							columnWidth: ".mkdf-ps-grid-sizer"
						}
					}), mkdf.modules.common.setFixedImageProportionSize(e, e.find(".mkdf-ps-image"), t, a), e.isotope("layout").css("opacity", "1")
				})
			}
		}
	}(jQuery),
	function (o) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = o(".mkdf-accordion-holder");
			e.length && e.each(function () {
				var e = o(this);
				if (e.hasClass("mkdf-accordion") && e.accordion({
					animate: "swing",
					collapsible: !0,
					active: 0,
					icons: "",
					heightStyle: "content"
				}), e.hasClass("mkdf-toggle")) {
					var t = o(this),
						a = t.find(".mkdf-accordion-title"),
						d = a.next();
					t.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset"), a.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom"), d.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(), a.each(function () {
						var e = o(this);
						e.on("mouseenter mouseleave", function () {
							e.toggleClass("ui-state-hover")
						}), e.on("click", function () {
							e.toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom"), e.next().toggleClass("ui-accordion-content-active").slideToggle(400)
						})
					})
				}
			})
		} (mkdf.modules.accordions = e).mkdfInitAccordions = a, e.mkdfOnDocumentReady = t, o(document).ready(t)
	}(jQuery),
	function (o) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var a, d, e = o(".mkdf-grow-in, .mkdf-fade-in-down, .mkdf-element-from-fade, .mkdf-element-from-left, .mkdf-element-from-right, .mkdf-element-from-top, .mkdf-element-from-bottom, .mkdf-flip-in, .mkdf-x-rotate, .mkdf-z-rotate, .mkdf-y-translate, .mkdf-fade-in, .mkdf-fade-in-left-x-rotate");
			e.length && e.each(function () {
				var t = o(this);
				t.appear(function () {
					if (a = t.data("animation"), d = parseInt(t.data("animation-delay")), void 0 !== a && "" !== a) {
						var e = a + "-on";
						setTimeout(function () {
							t.addClass(e)
						}, d)
					}
				}, {
					accX: 0,
					accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
				})
			})
		} (mkdf.modules.animationHolder = e).mkdfInitAnimationHolder = a, e.mkdfOnDocumentReady = t, o(document).ready(t)
	}(jQuery),
	function (t) {
		"use strict";
		var e = {};

		function a() {
			d().init()
		} (mkdf.modules.button = e).mkdfButton = d, e.mkdfOnDocumentReady = a, t(document).ready(a);
		var d = function () {
			var e = t(".mkdf-btn");
			return {
				init: function () {
					e.length && e.each(function () {
						! function (e) {
							if (void 0 !== e.data("hover-color")) {
								var t = function (e) {
									e.data.button.css("color", e.data.color)
								},
									a = e.css("color"),
									d = e.data("hover-color");
								e.on("mouseenter", {
									button: e,
									color: d
								}, t), e.on("mouseleave", {
									button: e,
									color: a
								}, t)
							}
						}(t(this)),
							function (e) {
								if (void 0 !== e.data("hover-bg-color")) {
									var t = function (e) {
										e.data.button.css("background-color", e.data.color)
									},
										a = e.css("background-color"),
										d = e.data("hover-bg-color");
									e.on("mouseenter", {
										button: e,
										color: d
									}, t), e.on("mouseleave", {
										button: e,
										color: a
									}, t)
								}
							}(t(this)),
							function (e) {
								if (void 0 !== e.data("hover-border-color")) {
									var t = function (e) {
										e.data.button.css("border-color", e.data.color)
									},
										a = e.css("borderTopColor"),
										d = e.data("hover-border-color");
									e.on("mouseenter", {
										button: e,
										color: d
									}, t), e.on("mouseleave", {
										button: e,
										color: a
									}, t)
								}
							}(t(this))
					})
				}
			}
		}
	}(jQuery),
	function (g) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var o, i, n, s, r, l, m, f, c, u, h, e = g(".mkdf-countdown"),
				t = new Date,
				k = t.getMonth(),
				p = t.getFullYear();
			e.length && e.each(function () {
				var e, t, a = g(this).attr("id"),
					d = g("#" + a);
				o = d.data("year"), i = d.data("month"), n = d.data("day"), s = d.data("hour"), r = d.data("minute"), l = d.data("timezone"), m = d.data("month-label"), f = d.data("day-label"), c = d.data("hour-label"), u = d.data("minute-label"), h = d.data("second-label"), e = d.data("digit-size"), t = d.data("label-size"), k == i && p == o || (i -= 1), d.countdown({
					until: new Date(o, i, n, s, r, 44),
					labels: ["", m, "", f, c, u, h],
					format: "ODHMS",
					timezone: l,
					padZeroes: !0,
					onTick: function () {
						d.find(".countdown-amount").css({
							"font-size": e + "px",
							"line-height": e + "px"
						}), d.find(".countdown-period").css({
							"font-size": t + "px"
						})
					}
				})
			})
		} (mkdf.modules.countdown = e).mkdfInitCountdown = a, e.mkdfOnDocumentReady = t, g(document).ready(t)
	}(jQuery),
	function (d) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = d(".mkdf-counter-holder");
			e.length && e.each(function () {
				var t = d(this),
					a = t.find(".mkdf-counter");
				t.appear(function () {
					if (t.css("opacity", "1"), a.hasClass("mkdf-zero-counter")) {
						var e = parseFloat(a.text());
						a.countTo({
							from: 0,
							to: e,
							speed: 1500,
							refreshInterval: 100
						})
					} else a.absoluteCounter({
						speed: 2e3,
						fadeInDelay: 1e3
					})
				}, {
					accX: 0,
					accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
				})
			})
		} (mkdf.modules.counter = e).mkdfInitCounter = a, e.mkdfOnDocumentReady = t, d(document).ready(t)
	}(jQuery),
	function (r) {
		"use strict";
		var e = {};

		function t() {
			d()
		}

		function a() {
			o()
		}

		function d() {
			var e = r(".mkdf-custom-font-holder");
			e.length && e.each(function () {
				var e = r(this),
					t = "",
					a = "",
					d = "",
					o = "",
					i = "",
					n = "",
					s = "";
				void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")), void 0 !== e.data("font-size-1366") && !1 !== e.data("font-size-1366") && (a += "font-size: " + e.data("font-size-1366") + " !important;"), void 0 !== e.data("font-size-1024") && !1 !== e.data("font-size-1024") && (d += "font-size: " + e.data("font-size-1024") + " !important;"), void 0 !== e.data("font-size-768") && !1 !== e.data("font-size-768") && (o += "font-size: " + e.data("font-size-768") + " !important;"), void 0 !== e.data("font-size-680") && !1 !== e.data("font-size-680") && (i += "font-size: " + e.data("font-size-680") + " !important;"), void 0 !== e.data("line-height-1366") && !1 !== e.data("line-height-1366") && (a += "line-height: " + e.data("line-height-1366") + " !important;"), void 0 !== e.data("line-height-1024") && !1 !== e.data("line-height-1024") && (d += "line-height: " + e.data("line-height-1024") + " !important;"), void 0 !== e.data("line-height-768") && !1 !== e.data("line-height-768") && (o += "line-height: " + e.data("line-height-768") + " !important;"), void 0 !== e.data("line-height-680") && !1 !== e.data("line-height-680") && (i += "line-height: " + e.data("line-height-680") + " !important;"), (a.length || d.length || o.length || i.length) && (a.length && (s += "@media only screen and (max-width: 1280px) {.mkdf-custom-font-holder." + t + " { " + a + " } }"), d.length && (s += "@media only screen and (max-width: 1024px) {.mkdf-custom-font-holder." + t + " { " + d + " } }"), o.length && (s += "@media only screen and (max-width: 768px) {.mkdf-custom-font-holder." + t + " { " + o + " } }"), i.length && (s += "@media only screen and (max-width: 680px) {.mkdf-custom-font-holder." + t + " { " + i + " } }")), s.length && (n = '<style type="text/css">' + s + "</style>"), n.length && r("head").append(n)
			})
		}

		function o() {
			var e = r(".mkdf-cf-typed");
			e.length && e.each(function () {
				var e = r(this),
					t = e.parent(".mkdf-cf-typed-wrap").parent(".mkdf-custom-font-holder"),
					a = [],
					d = e.find(".mkdf-cf-typed-1").text(),
					o = e.find(".mkdf-cf-typed-2").text(),
					i = e.find(".mkdf-cf-typed-3").text(),
					n = e.find(".mkdf-cf-typed-4").text();
				d.length && a.push(d), o.length && a.push(o), i.length && a.push(i), n.length && a.push(n), t.appear(function () {
					e.typed({
						strings: a,
						typeSpeed: 90,
						backDelay: 700,
						loop: !0,
						contentType: "text",
						loopCount: !1,
						cursorChar: "_"
					})
				}, {
					accX: 0,
					accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
				})
			})
		} (mkdf.modules.customFont = e).mkdfCustomFontResize = d, e.mkdfCustomFontTypeOut = o, e.mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, r(document).ready(t), r(window).on("load", a)
	}(jQuery),
	function (r) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = r(".mkdf-elements-holder");
			e.length && e.each(function () {
				var e = r(this).children(".mkdf-eh-item"),
					t = "",
					s = "";
				e.each(function () {
					var e = r(this),
						t = "",
						a = "",
						d = "",
						o = "",
						i = "",
						n = "";
					void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")), void 0 !== e.data("1366-1600") && !1 !== e.data("1366-1600") && (a = e.data("1366-1600")), void 0 !== e.data("1024-1366") && !1 !== e.data("1024-1366") && (d = e.data("1024-1366")), void 0 !== e.data("768-1024") && !1 !== e.data("768-1024") && (o = e.data("768-1024")), void 0 !== e.data("680-768") && !1 !== e.data("680-768") && (i = e.data("680-768")), void 0 !== e.data("680") && !1 !== e.data("680") && (n = e.data("680")), (a.length || d.length || o.length || i.length || n.length || "".length) && (a.length && (s += "@media only screen and (min-width: 1367px) and (max-width: 1600px) {.mkdf-eh-item-content." + t + " { padding: " + a + " !important; } }"), d.length && (s += "@media only screen and (min-width: 1025px) and (max-width: 1366px) {.mkdf-eh-item-content." + t + " { padding: " + d + " !important; } }"), o.length && (s += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.mkdf-eh-item-content." + t + " { padding: " + o + " !important; } }"), i.length && (s += "@media only screen and (min-width: 681px) and (max-width: 768px) {.mkdf-eh-item-content." + t + " { padding: " + i + " !important; } }"), n.length && (s += "@media only screen and (max-width: 680px) {.mkdf-eh-item-content." + t + " { padding: " + n + " !important; } }"))
				}), s.length && (t = '<style type="text/css">' + s + "</style>"), t.length && r("head").append(t), "function" == typeof mkdf.modules.common.mkdfOwlSlider && setTimeout(function () {
					mkdf.modules.common.mkdfOwlSlider()
				}, 200)
			})
		} (mkdf.modules.elementsHolder = e).mkdfInitElementsHolderResponsiveStyle = a, e.mkdfOnDocumentReady = t, r(document).ready(t)
	}(jQuery),
	function (f) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = f(".mkdf-full-screen-sections");
			e.length && e.each(function () {
				var d = f(this),
					e = d.children(".mkdf-fss-wrapper"),
					o = e.children(".mkdf-fss-item"),
					i = o.length,
					n = o.hasClass("mkdf-fss-item-has-style"),
					t = !1,
					a = "",
					s = "",
					r = "";
				mkdf.body.hasClass("mkdf-light-header") ? r = "light" : mkdf.body.hasClass("mkdf-dark-header") && (r = "dark"), void 0 !== d.data("enable-continuous-vertical") && !1 !== d.data("enable-continuous-vertical") && "yes" === d.data("enable-continuous-vertical") && (t = !0), void 0 !== d.data("enable-navigation") && !1 !== d.data("enable-navigation") && (a = d.data("enable-navigation")), void 0 !== d.data("enable-pagination") && !1 !== d.data("enable-pagination") && (s = d.data("enable-pagination"));
				var l = "no" !== a,
					m = "no" !== s;
				e.fullpage({
					sectionSelector: ".mkdf-fss-item",
					scrollingSpeed: 1200,
					verticalCentered: !1,
					continuousVertical: t,
					navigation: m,
					onLeave: function (e, t, a) {
						n && c(f(o[t - 1]).data("header-style"), r), l && u(d, i, t)
					},
					afterRender: function () {
						n && c(o.first().data("header-style"), r), l && (u(d, i, 1), d.children(".mkdf-fss-nav-holder").css("visibility", "visible")), e.css("visibility", "visible")
					}
				}),
					function (e) {
						var t = e.find(".mkdf-fss-item"),
							n = "",
							a = "";
						t.each(function () {
							var e = f(this),
								t = "",
								a = "",
								d = "",
								o = "",
								i = "";
							void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")), void 0 !== e.data("laptop-image") && !1 !== e.data("laptop-image") && (a = e.data("laptop-image")), void 0 !== e.data("tablet-image") && !1 !== e.data("tablet-image") && (d = e.data("tablet-image")), void 0 !== e.data("tablet-portrait-image") && !1 !== e.data("tablet-portrait-image") && (o = e.data("tablet-portrait-image")), void 0 !== e.data("mobile-image") && !1 !== e.data("mobile-image") && (i = e.data("mobile-image")), (a.length || d.length || o.length || i.length) && (a.length && (n += "@media only screen and (max-width: 1366px) {.mkdf-fss-item." + t + " { background-image: url(" + a + ") !important; } }"), d.length && (n += "@media only screen and (max-width: 1024px) {.mkdf-fss-item." + t + " { background-image: url( " + d + ") !important; } }"), o.length && (n += "@media only screen and (max-width: 800px) {.mkdf-fss-item." + t + " { background-image: url( " + o + ") !important; } }"), i.length && (n += "@media only screen and (max-width: 680px) {.mkdf-fss-item." + t + " { background-image: url( " + i + ") !important; } }"))
						}), n.length && (a = '<style type="text/css">' + n + "</style>");
						a.length && f("head").append(a)
					}(d), l && (d.find("#mkdf-fss-nav-up").on("click", function () {
						return f.fn.fullpage.moveSectionUp(), !1
					}), d.find("#mkdf-fss-nav-down").on("click", function () {
						return f.fn.fullpage.moveSectionDown(), !1
					}))
			})
		}

		function c(e, t) {
			void 0 !== e && "" !== e ? mkdf.body.removeClass("mkdf-light-header mkdf-dark-header").addClass("mkdf-" + e + "-header") : "" !== t ? mkdf.body.removeClass("mkdf-light-header mkdf-dark-header").addClass("mkdf-" + t + "-header") : mkdf.body.removeClass("mkdf-light-header mkdf-dark-header")
		}

		function u(e, t, a) {
			var d = e,
				o = d.find("#mkdf-fss-nav-up"),
				i = d.find("#mkdf-fss-nav-down"),
				n = !1;
			void 0 !== e.data("enable-continuous-vertical") && !1 !== e.data("enable-continuous-vertical") && "yes" === e.data("enable-continuous-vertical") && (n = !0), 1 !== a || n ? a !== t || n ? (o.css({
				opacity: "1",
				height: "auto",
				visibility: "visible"
			}), i.css({
				opacity: "1",
				height: "auto",
				visibility: "visible"
			})) : (i.css({
				opacity: "0",
				height: "0",
				visibility: "hidden"
			}), 2 === t && o.css({
				opacity: "1",
				height: "auto",
				visibility: "visible"
			})) : (o.css({
				opacity: "0",
				height: "0",
				visibility: "hidden"
			}), i.css({
				opacity: "0",
				height: "0",
				visibility: "hidden"
			}), a !== t && i.css({
				opacity: "1",
				height: "auto",
				visibility: "visible"
			}))
		} (mkdf.modules.fullScreenSections = e).mkdfInitFullScreenSections = a, e.mkdfOnDocumentReady = t, f(document).ready(t)
	}(jQuery),
	function (k) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = k(".mkdf-google-map");
			e.length && e.each(function () {
				var e, t, a, d, o, i, n, s, r, l, m = k(this),
					f = !1,
					c = "";
				if (void 0 !== m.data("snazzy-map-style") && "yes" === m.data("snazzy-map-style")) {
					f = !0;
					var u = m.parent().find(".mkdf-snazzy-map"),
						h = u.val();
					u.length && h.length && (c = JSON.parse(h.replace(/`{`/g, "[").replace(/`}`/g, "]").replace(/``/g, '"').replace(/`/g, "")))
				}
				void 0 !== m.data("custom-map-style") && (e = m.data("custom-map-style")), void 0 !== m.data("color-overlay") && !1 !== m.data("color-overlay") && (t = m.data("color-overlay")), void 0 !== m.data("saturation") && !1 !== m.data("saturation") && (a = m.data("saturation")), void 0 !== m.data("lightness") && !1 !== m.data("lightness") && (d = m.data("lightness")), void 0 !== m.data("zoom") && !1 !== m.data("zoom") && (o = m.data("zoom")), void 0 !== m.data("pin") && !1 !== m.data("pin") && (i = m.data("pin")), void 0 !== m.data("height") && !1 !== m.data("height") && (n = m.data("height")), void 0 !== m.data("unique-id") && !1 !== m.data("unique-id") && (s = m.data("unique-id")), void 0 !== m.data("scroll-wheel") && (r = m.data("scroll-wheel")), void 0 !== m.data("addresses") && !1 !== m.data("addresses") && (l = m.data("addresses")),
					function (e, t, a, d, o, i, n, s, r, l, m, f, c, u) {
						if ("object" != typeof google) return;
						var h, k = [];
						k = e && t.length ? t : [{
							stylers: [{
								hue: d
							}, {
								saturation: o
							}, {
								lightness: i
							}, {
								gamma: 1
							}]
						}];
						h = e || "yes" === a ? "mkdf-style" : google.maps.MapTypeId.ROADMAP;
						n = "yes" === n;
						var p = new google.maps.StyledMapType(k, {
							name: "Mikado Google Map"
						});
						c = new google.maps.Geocoder;
						var g = new google.maps.LatLng(-34.397, 150.644);
						isNaN(l) || (l += "px");
						var v, y = {
							zoom: s,
							scrollwheel: n,
							center: g,
							zoomControl: !0,
							zoomControlOptions: {
								style: google.maps.ZoomControlStyle.SMALL,
								position: google.maps.ControlPosition.RIGHT_CENTER
							},
							scaleControl: !1,
							scaleControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
							},
							streetViewControl: !1,
							streetViewControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
							},
							panControl: !1,
							panControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
							},
							mapTypeControl: !1,
							mapTypeControlOptions: {
								mapTypeIds: [google.maps.MapTypeId.ROADMAP, "mkdf-style"],
								style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
								position: google.maps.ControlPosition.LEFT_CENTER
							},
							mapTypeId: h
						};
						for ((f = new google.maps.Map(document.getElementById(r), y)).mapTypes.set("mkdf-style", p), v = 0; v < u.length; ++v) w(u[v], m, f, c);
						document.getElementById(r).style.height = l
					}(f, c, e, t, a, d, r, o, "mkdf-map-" + s, n, i, "map_" + s, "geocoder_" + s, l)
			})
		}

		function w(d, o, i, e) {
			if ("" !== d) {
				var t = '<div id="content"><div id="siteNotice"></div><div id="bodyContent"><p>' + d + "</p></div></div>",
					n = new google.maps.InfoWindow({
						content: t
					});
				e.geocode({
					address: d
				}, function (e, t) {
					if (t === google.maps.GeocoderStatus.OK) {
						i.setCenter(e[0].geometry.location);
						var a = new google.maps.Marker({
							map: i,
							position: e[0].geometry.location,
							icon: o,
							title: d.store_title
						});
						google.maps.event.addListener(a, "click", function () {
							n.open(i, a)
						}), google.maps.event.addDomListener(window, "resize", function () {
							i.setCenter(e[0].geometry.location)
						})
					}
				})
			}
		} (mkdf.modules.googleMap = e).mkdfShowGoogleMap = a, e.mkdfOnDocumentReady = t, k(document).ready(t)
	}(jQuery),
	function (t) {
		"use strict";
		var e = {};

		function a() {
			d().init()
		} (mkdf.modules.icon = e).mkdfIcon = d, e.mkdfOnDocumentReady = a, t(document).ready(a);
		var d = function () {
			var e = t(".mkdf-icon-shortcode");
			return {
				init: function () {
					e.length && e.each(function () {
						! function (e) {
							e.hasClass("mkdf-icon-animation") && e.appear(function () {
								e.parent(".mkdf-icon-animation-holder").addClass("mkdf-icon-animation-show")
							}, {
								accX: 0,
								accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
							})
						}(t(this)),
							function (e) {
								if (void 0 !== e.data("hover-color")) {
									var t = function (e) {
										e.data.icon.css("color", e.data.color)
									},
										a = e.find(".mkdf-icon-element"),
										d = e.data("hover-color"),
										o = a.css("color");
									"" !== d && (e.on("mouseenter", {
										icon: a,
										color: d
									}, t), e.on("mouseleave", {
										icon: a,
										color: o
									}, t))
								}
							}(t(this)),
							function (e) {
								if (void 0 !== e.data("hover-background-color")) {
									var t = function (e) {
										e.data.icon.css("background-color", e.data.color)
									},
										a = e.find(".mkdf-icon-bckg-holder"),
										d = e.data("hover-background-color"),
										o = a.css("background-color");
									"" !== d && (e.on("mouseenter", {
										icon: a,
										color: d
									}, t), e.on("mouseleave", {
										icon: a,
										color: o
									}, t))
								}
							}(t(this)),
							function (e) {
								if (void 0 !== e.data("hover-border-color")) {
									var t = function (e) {
										e.data.icon.css("border-color", e.data.color)
									},
										a = e.find(".mkdf-icon-bckg-holder"),
										d = e.data("hover-border-color"),
										o = a.css("borderTopColor");
									"" !== d && (e.on("mouseenter", {
										icon: a,
										color: d
									}, t), e.on("mouseleave", {
										icon: a,
										color: o
									}, t))
								}
							}(t(this))
					})
				}
			}
		}
	}(jQuery),
	function (t) {
		"use strict";
		var e = {};

		function a() {
			d().init()
		} (mkdf.modules.iconListItem = e).mkdfInitIconList = d, e.mkdfOnDocumentReady = a, t(document).ready(a);
		var d = function () {
			var e = t(".mkdf-animate-list");
			return {
				init: function () {
					e.length && e.each(function () {
						! function (e) {
							setTimeout(function () {
								e.appear(function () {
									e.addClass("mkdf-appeared")
								}, {
									accX: 0,
									accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
								})
							}, 30)
						}(t(this))
					})
				}
			}
		}
	}(jQuery),
	function (d) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = d(".mkdf-image-gallery.mkdf-ig-masonry-type");
			e.length && e.each(function () {
				var e = d(this),
					t = e.find(".mkdf-ig-masonry"),
					a = t.find(".mkdf-ig-grid-sizer").width();
				t.waitForImages(function () {
					t.isotope({
						layoutMode: "packery",
						itemSelector: ".mkdf-ig-image",
						percentPosition: !0,
						packery: {
							gutter: ".mkdf-ig-grid-gutter",
							columnWidth: ".mkdf-ig-grid-sizer"
						}
					}), e.hasClass("mkdf-ig-masonry-fixed-type") && function (e, t) {
						var a = parseInt(t.find(".mkdf-ig-image").css("paddingLeft")),
							d = void 0 !== a && "" !== a ? parseInt(a, 10) : 0,
							o = e - 2 * d,
							i = t.find(".mkdf-default-masonry-item"),
							n = t.find(".mkdf-large-width-masonry-item"),
							s = t.find(".mkdf-large-height-masonry-item"),
							r = t.find(".mkdf-large-width-height-masonry-item");
						768 < mkdf.windowWidth ? (i.css("height", o), s.css("height", Math.round(2 * (o + d))), r.css("height", Math.round(2 * (o + d))), n.css("height", o)) : (i.css("height", o), s.css("height", Math.round(2 * (o + d))), r.css("height", o), n.css("height", Math.round(o / 2)))
					}(a, t), setTimeout(function () {
						t.isotope("layout"), mkdf.modules.common.mkdfInitParallax()
					}, 800), t.css("opacity", "1")
				})
			})
		} (mkdf.modules.imageGallery = e).mkdfInitImageGalleryMasonry = a, e.mkdfOnWindowLoad = t, d(window).on("load", t)
	}(jQuery),
	function (i) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = i(".mkdf-item-showcase-holder");
			e.length && e.each(function () {
				var t = i(this),
					e = t.find(".mkdf-is-left"),
					a = t.find(".mkdf-is-right"),
					d = t.find(".mkdf-is-image");

				function o(e) {
					t.find(e).each(function (e) {
						var t = i(this);
						setTimeout(function () {
							t.addClass("mkdf-appeared")
						}, 150 * e)
					})
				}
				e.wrapAll("<div class='mkdf-is-item-holder mkdf-is-left-holder' />"), a.wrapAll("<div class='mkdf-is-item-holder mkdf-is-right-holder' />"), t.animate({
					opacity: 1
				}, 200), setTimeout(function () {
					t.appear(function () {
						d.addClass("mkdf-appeared"), t.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function (e) {
							1200 < mkdf.windowWidth ? (o(".mkdf-is-left-holder .mkdf-is-item"), o(".mkdf-is-right-holder .mkdf-is-item")) : o(".mkdf-is-item")
						})
					}, {
						accX: 0,
						accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
					})
				}, 100)
			})
		} (mkdf.modules.itemShowcase = e).mkdfInitItemShowcase = a, e.mkdfOnDocumentReady = t, i(document).ready(t)
	}(jQuery),
	function (i) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = i(".mkdf-pie-chart-holder");
			e.length && e.each(function () {
				var e = i(this),
					t = e.children(".mkdf-pc-percentage"),
					a = "#f34f3f",
					d = "#f7f7f7",
					o = 176;
				void 0 !== t.data("size") && "" !== t.data("size") && (o = t.data("size")), void 0 !== t.data("bar-color") && "" !== t.data("bar-color") && (a = t.data("bar-color")), void 0 !== t.data("track-color") && "" !== t.data("track-color") && (d = t.data("track-color")), t.appear(function () {
					! function (e) {
						var t = e.find(".mkdf-pc-percent"),
							a = parseFloat(t.text());
						t.countTo({
							from: 0,
							to: a,
							speed: 1500,
							refreshInterval: 50
						})
					}(t), e.css("opacity", "1"), t.easyPieChart({
						barColor: a,
						trackColor: d,
						scaleColor: !1,
						lineCap: "butt",
						lineWidth: 3,
						animate: 1500,
						size: o
					})
				}, {
					accX: 0,
					accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
				})
			})
		} (mkdf.modules.pieChart = e).mkdfInitPieChart = a, e.mkdfOnDocumentReady = t, i(document).ready(t)
	}(jQuery),
	function (t) {
		"use strict";
		var e = {};

		function a() {
			d()
		}

		function d() {
			var e = t(".mkdf-process-holder");
			e.length && e.each(function () {
				var e = t(this);
				e.appear(function () {
					e.addClass("mkdf-process-appeared")
				}, {
					accX: 0,
					accY: mkdfGlobalVars.vars.mkdfElementAppearAmount
				})
			})
		} (mkdf.modules.process = e).mkdfInitProcess = d, e.mkdfOnDocumentReady = a, t(document).ready(a)
	}(jQuery),
	function (o) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = o(".mkdf-progress-bar");
			e.length && e.each(function () {
				var e = o(this),
					t = e.find(".mkdf-pb-content"),
					a = e.find(".mkdf-pb-percent"),
					d = t.data("percentage");
				e.appear(function () {
					! function (e, t) {
						var a = parseFloat(t);
						e.length && e.each(function () {
							var e = o(this);
							e.css("opacity", "1"), e.countTo({
								from: 0,
								to: a,
								speed: 2e3,
								refreshInterval: 50
							})
						})
					}(a, d), t.css("width", "0%").animate({
						width: d + "%"
					}, 2e3), e.hasClass("mkdf-pb-percent-floating") && a.css("left", "0%").animate({
						left: d + "%"
					}, 2e3)
				})
			})
		} (mkdf.modules.progressBar = e).mkdfInitProgressBars = a, e.mkdfOnDocumentReady = t, o(document).ready(t)
	}(jQuery),
	function (i) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var e = i(".mkdf-tabs");
			e.length && e.each(function () {
				var e = i(this);
				e.children(".mkdf-tab-container").each(function (e) {
					e += 1;
					var t = i(this),
						a = t.attr("id"),
						d = t.parent().find(".mkdf-tabs-nav li:nth-child(" + e + ") a"),
						o = d.attr("href"); - 1 < (a = "#" + a).indexOf(o) && d.attr("href", a)
				}), e.tabs(), i(".mkdf-tabs a.mkdf-external-link").off("click")
			})
		} (mkdf.modules.tabs = e).mkdfInitTabs = a, e.mkdfOnDocumentReady = t, i(document).ready(t)
	}(jQuery),
	function (r) {
		"use strict";
		var e = {};

		function t() {
			d(), a()
		}

		function a() {
			var e = r(".mkdf-text-marquee");
			e.length && e.each(function () {
				function i(e) {
					return t.outerWidth() > e.outerWidth() ? t.outerWidth() : e.outerWidth()
				}
				var t = r(this),
					e = t.find(".mkdf-marquee-element"),
					n = e.filter(".mkdf-original-text"),
					s = e.filter(".mkdf-aux-text");
				! function () {
					window.requestNextAnimationFrame = function () {
						var a = void 0,
							d = void 0,
							e = navigator.userAgent,
							t = 0,
							o = this;
						return window.webkitRequestAnimationFrame && (d = function (e) {
							void 0 === e && (e = +new Date), o.callback(e)
						}, a = window.webkitRequestAnimationFrame, window.webkitRequestAnimationFrame = function (e, t) {
							o.callback = e, a(d, t)
						}), window.mozRequestAnimationFrame && (t = e.indexOf("rv:"), -1 != e.indexOf("Gecko") && "2.0" === e.substr(t + 3, 3) && (window.mozRequestAnimationFrame = void 0)), window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
							var a, d;
							window.setTimeout(function () {
								a = +new Date, e(a), d = +new Date, o.timeout = 1e3 / 60 - (d - a)
							}, o.timeout)
						}
					}();
					var o = i(n);
					e.css({
						width: o
					}), s.css("left", o), e.each(function (e) {
						var t = r(this),
							a = 0,
							d = function () {
								a -= 1, t.position().left <= -o && (t.css("left", parseInt(o - 1)), a = 0), t.css("transform", "translate3d(" + .8 * a + "px,0,0)"), requestNextAnimationFrame(d), r(window).resize(function () {
									o = i(n), a = 0, n.css("left", 0), s.css("left", o)
								})
							};
						d()
					})
				}()
			})
		}

		function d() {
			var e = r(".mkdf-text-marquee");
			e.length && e.each(function () {
				var e = r(this),
					t = "",
					a = "",
					d = "",
					o = "",
					i = "",
					n = "",
					s = "";
				void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")), void 0 !== e.data("font-size-1366") && !1 !== e.data("font-size-1366") && (a += "font-size: " + e.data("font-size-1366") + " !important;"), void 0 !== e.data("font-size-1024") && !1 !== e.data("font-size-1024") && (d += "font-size: " + e.data("font-size-1024") + " !important;"), void 0 !== e.data("font-size-768") && !1 !== e.data("font-size-768") && (o += "font-size: " + e.data("font-size-768") + " !important;"), void 0 !== e.data("font-size-680") && !1 !== e.data("font-size-680") && (i += "font-size: " + e.data("font-size-680") + " !important;"), void 0 !== e.data("line-height-1366") && !1 !== e.data("line-height-1366") && (a += "line-height: " + e.data("line-height-1366") + " !important;"), void 0 !== e.data("line-height-1024") && !1 !== e.data("line-height-1024") && (d += "line-height: " + e.data("line-height-1024") + " !important;"), void 0 !== e.data("line-height-768") && !1 !== e.data("line-height-768") && (o += "line-height: " + e.data("line-height-768") + " !important;"), void 0 !== e.data("line-height-680") && !1 !== e.data("line-height-680") && (i += "line-height: " + e.data("line-height-680") + " !important;"), (a.length || d.length || o.length || i.length) && (a.length && (s += "@media only screen and (max-width: 1366px) {.mkdf-text-marquee." + t + " { " + a + " } }"), d.length && (s += "@media only screen and (max-width: 1024px) {.mkdf-text-marquee." + t + " { " + d + " } }"), o.length && (s += "@media only screen and (max-width: 768px) {.mkdf-text-marquee." + t + " { " + o + " } }"), i.length && (s += "@media only screen and (max-width: 680px) {.mkdf-text-marquee." + t + " { " + i + " } }")), s.length && (n = '<style type="text/css">' + s + "</style>"), n.length && r("head").append(n)
			})
		} (mkdf.modules.textMarquee = e).mkdfInitTextMarquee = a, e.mkdfTextMarqueeResize = d, e.mkdfOnDocumentReady = t, r(document).ready(t)
	}(jQuery),
	function (r) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var n = r(".mkdf-uncovering-sections");
			n.length && n.each(function () {
				var e = r(this),
					t = n.find(".curtains"),
					a = t.find(".mkdf-uss-item"),
					d = n.find(".mkdf-fss-shadow"),
					o = mkdf.body,
					i = "";
				o.hasClass("mkdf-light-header") ? i = "light" : o.hasClass("mkdf-dark-header") && (i = "dark"), o.addClass("mkdf-uncovering-section-on-page"), 0 < mkdfPerPageVars.vars.mkdfHeaderVerticalWidth && 1024 < mkdf.windowWidth && (a.css({
					left: mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
					width: "calc(100% - " + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + "px)"
				}), d.css({
					left: mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
					width: "calc(100% - " + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + "px)"
				})), t.curtain({
					scrollSpeed: 400,
					nextSlide: function () {
						s(t, i)
					},
					prevSlide: function () {
						s(t, i)
					}
				}), s(t, i),
					function (e) {
						var t = e.find(".mkdf-uss-item"),
							s = "",
							a = "";
						t.each(function () {
							var e = r(this),
								t = e.find(".mkdf-uss-image-holder"),
								a = "",
								d = "",
								o = "",
								i = "",
								n = "";
							void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (a = e.data("item-class")), void 0 !== t.data("laptop-image") && !1 !== t.data("laptop-image") && (d = t.data("laptop-image")), void 0 !== t.data("tablet-image") && !1 !== t.data("tablet-image") && (o = t.data("tablet-image")), void 0 !== t.data("tablet-portrait-image") && !1 !== t.data("tablet-portrait-image") && (i = t.data("tablet-portrait-image")), void 0 !== t.data("mobile-image") && !1 !== t.data("mobile-image") && (n = t.data("mobile-image")), (d.length || o.length || i.length || n.length) && (d.length && (s += "@media only screen and (max-width: 1366px) {.mkdf-uss-item." + a + " .mkdf-uss-image-holder { background-image: url(" + d + ") !important; } }"), o.length && (s += "@media only screen and (max-width: 1024px) {.mkdf-uss-item." + a + " .mkdf-uss-image-holder { background-image: url( " + o + ") !important; } }"), i.length && (s += "@media only screen and (max-width: 800px) {.mkdf-uss-item." + a + " .mkdf-uss-image-holder { background-image: url( " + i + ") !important; } }"), n.length && (s += "@media only screen and (max-width: 680px) {.mkdf-uss-item." + a + " .mkdf-uss-image-holder { background-image: url( " + n + ") !important; } }"))
						}), s.length && (a = '<style type="text/css">' + s + "</style>");
						a.length && r("head").append(a)
					}(t), e.addClass("mkdf-loaded")
			})
		}

		function s(e, t) {
			var a = e.find(".current").data("header-style");
			void 0 !== a && "" !== a ? mkdf.body.removeClass("mkdf-light-header mkdf-dark-header").addClass("mkdf-" + a + "-header") : "" !== t ? mkdf.body.removeClass("mkdf-light-header mkdf-dark-header").addClass("mkdf-" + t + "-header") : mkdf.body.removeClass("mkdf-light-header mkdf-dark-header")
		} (mkdf.modules.uncoveringSections = e).mkdfInitUncoveringSections = a, e.mkdfOnDocumentReady = t, r(document).ready(t)
	}(jQuery),
	function (r) {
		"use strict";
		var e = {};

		function t() {
			a()
		}

		function a() {
			var n = r(".mkdf-vertical-split-slider");
			if (n.length) {
				mkdf.body.hasClass("mkdf-vss-initialized") && (mkdf.body.removeClass("mkdf-vss-initialized"), r.fn.multiscroll.destroy()), n.height(mkdf.windowHeight).animate({
					opacity: 1
				}, 300);
				var s = "";
				mkdf.body.hasClass("mkdf-light-header") ? s = "light" : mkdf.body.hasClass("mkdf-dark-header") && (s = "dark"), n.multiscroll({
					scrollingSpeed: 700,
					easing: "easeInOutQuart",
					navigation: !0,
					useAnchorsOnLoad: !1,
					sectionSelector: ".mkdf-vss-ms-section",
					leftSelector: ".mkdf-vss-ms-left",
					rightSelector: ".mkdf-vss-ms-right",
					afterRender: function () {
						l(r(".mkdf-vss-ms-left .mkdf-vss-ms-section:first-child").data("header-style"), s), mkdf.body.addClass("mkdf-vss-initialized");
						var e = r("div.wpcf7 > form");
						e.length && e.each(function () {
							var t = r(this);
							t.find(".wpcf7-submit").off().on("click", function (e) {
								e.preventDefault(), wpcf7.submit(t)
							})
						});
						var t = r('<div class="mkdf-vss-responsive"></div>'),
							a = n.find(".mkdf-vss-ms-left > div"),
							d = n.find(".mkdf-vss-ms-right > div");
						n.after(t);
						for (var o = 0; o < a.length; o++) t.append(r(a[o]).clone(!0)), t.append(r(d[a.length - 1 - o]).clone(!0));
						var i = r(".mkdf-vss-responsive .mkdf-google-map");
						i.length && i.each(function () {
							var e = r(this);
							e.empty();
							var t = Math.floor(1e5 * Math.random() + 1);
							e.attr("id", "mkdf-map-" + t), e.data("unique-id", t)
						}), "function" == typeof mkdf.modules.animationHolder.mkdfInitAnimationHolder && mkdf.modules.animationHolder.mkdfInitAnimationHolder(), "function" == typeof mkdf.modules.button.mkdfButton && mkdf.modules.button.mkdfButton().init(), "function" == typeof mkdf.modules.elementsHolder.mkdfInitElementsHolderResponsiveStyle && mkdf.modules.elementsHolder.mkdfInitElementsHolderResponsiveStyle(), "function" == typeof mkdf.modules.googleMap.mkdfShowGoogleMap && mkdf.modules.googleMap.mkdfShowGoogleMap(), "function" == typeof mkdf.modules.icon.mkdfIcon && mkdf.modules.icon.mkdfIcon().init(), "function" == typeof mkdf.modules.progressBar.mkdfInitProgressBars && mkdf.modules.progressBar.mkdfInitProgressBars()
					},
					onLeave: function (e, t) {
						! function (e, t) {
							e.hasClass("mkdf-vss-scrolling-animation") && (1 < t && !e.hasClass("mkdf-vss-scrolled") ? e.addClass("mkdf-vss-scrolled") : 1 === t && e.hasClass("mkdf-vss-scrolled") && e.removeClass("mkdf-vss-scrolled"))
						}(n, t), l(r(r(".mkdf-vss-ms-left .mkdf-vss-ms-section")[t - 1]).data("header-style"), s)
					}
				}), mkdf.windowWidth <= 1024 ? r.fn.multiscroll.destroy() : r.fn.multiscroll.build(), r(window).resize(function () {
					mkdf.windowWidth <= 1024 ? r.fn.multiscroll.destroy() : r.fn.multiscroll.build()
				})
			}
		}

		function l(e, t) {
			void 0 !== e && "" !== e ? mkdf.body.removeClass("mkdf-light-header mkdf-dark-header").addClass("mkdf-" + e + "-header") : "" !== t ? mkdf.body.removeClass("mkdf-light-header mkdf-dark-header").addClass("mkdf-" + t + "-header") : mkdf.body.removeClass("mkdf-light-header mkdf-dark-header")
		} (mkdf.modules.verticalSplitSlider = e).mkdfInitVerticalSplitSlider = a, e.mkdfOnDocumentReady = t, r(document).ready(t)
	}(jQuery),
	function (a) {
		"use strict";
		var e = {};

		function t() {
			d().init()
		}

		function d() {
			var e = a(".mkdf-masonry-gallery-holder");
			return {
				init: function () {
					e.length && e.each(function () {
						var e = a(this),
							t = e.find(".mkdf-mg-grid-sizer").outerWidth();
						! function (t, a) {
							t.waitForImages(function () {
								var e = t.children();
								e.isotope({
									layoutMode: "packery",
									itemSelector: ".mkdf-mg-item",
									percentPosition: !0,
									packery: {
										gutter: ".mkdf-mg-grid-gutter",
										columnWidth: ".mkdf-mg-grid-sizer"
									}
								}), mkdf.modules.common.setFixedImageProportionSize(t, t.find(".mkdf-mg-item"), a, !0), setTimeout(function () {
									mkdf.modules.common.mkdfInitParallax()
								}, 600), e.isotope("layout").css("opacity", "1")
							})
						}(e, t), a(window).resize(function () {
							! function (e, t) {
								mkdf.modules.common.setFixedImageProportionSize(e, e.find(".mkdf-mg-item"), t, !0), e.children().isotope("reloadItems")
							}(e, t)
						})
					})
				}
			}
		} (mkdf.modules.masonryGalleryList = e).mkdfInitMasonryGallery = d, e.mkdfOnDocumentReady = t, a(document).ready(t)
	}(jQuery),
	function (u) {
		"use strict";
		var e = {};

		function t() { }

		function a() {
			i(),
				function () {
					var e = u(".mkdf-portfolio-list-holder .mkdf-pl-filter-holder");
					e.length && e.each(function () {
						var n = u(this),
							s = n.closest(".mkdf-portfolio-list-holder"),
							r = s.find(".mkdf-pl-inner"),
							l = !!s.hasClass("mkdf-pl-pag-load-more");
						n.find(".mkdf-pl-filter:first").addClass("mkdf-pl-current"), s.hasClass("mkdf-pl-gallery") && r.isotope(), n.find(".mkdf-pl-filter").on("click", function () {
							var e = u(this),
								t = e.attr("data-filter"),
								a = t.length ? t.substring(1) : "",
								d = !!r.children().hasClass(a),
								o = 1,
								i = 0;
							e.parent().children(".mkdf-pl-filter").removeClass("mkdf-pl-current"), e.addClass("mkdf-pl-current"), 0 !== t.length ? (o = r.children("." + a).length, i = e.attr("data-items-number")) : s.hasClass("mkdf-pl-all-loaded") && (o = i), l && !d && t.length ? (r.find(".mkdf-pl-load-more-holder").show(), function d(e, t, a) {
								var o = e,
									i = o.find(".mkdf-pl-inner"),
									n = t,
									s = a,
									r = 0;
								void 0 !== o.data("max-num-pages") && !1 !== o.data("max-num-pages") && (r = o.data("max-num-pages"));
								var l = mkdf.modules.common.getLoadMoreData(o),
									m = l.nextPage,
									f = mkdf.modules.common.setLoadMoreAjaxData(l, "fiorello_core_portfolio_ajax_load_more"),
									c = o.find(".mkdf-pl-loading");
								m <= r && (c.addClass("mkdf-showing mkdf-filter-trigger"), i.css("opacity", "0"), u.ajax({
									type: "POST",
									data: f,
									url: mkdfGlobalVars.vars.mkdfAjaxUrl,
									success: function (e) {
										m++, o.data("next-page", m);
										var t = u.parseJSON(e),
											a = t.html;
										o.waitForImages(function () {
											i.append(a).isotope("reloadItems").isotope({
												sortBy: "original-order"
											});
											var e = !!i.children().hasClass(s);
											e ? setTimeout(function () {
												mkdf.modules.common.setFixedImageProportionSize(o, i.find("article"), i.find(".mkdf-pl-grid-sizer").width()), i.isotope("layout").isotope({
													filter: n
												}), c.removeClass("mkdf-showing mkdf-filter-trigger"), setTimeout(function () {
													i.css("opacity", "1"), h(), mkdf.modules.common.mkdfInitParallax()
												}, 150)
											}, 400) : (c.removeClass("mkdf-showing mkdf-filter-trigger"), d(o, n, s))
										})
									}
								}))
							}(s, t, a)) : (t = 0 === t.length ? "*" : t, n.parent().children(".mkdf-pl-inner").isotope({
								filter: t
							}), mkdf.modules.common.mkdfInitParallax(), o === i ? s.find(".mkdf-pl-load-more-holder").hide() : s.find(".mkdf-pl-load-more-holder").show())
						})
					})
				}(), h(), n().init()
		}

		function d() {
			i()
		}

		function o() {
			n().scroll()
		}

		function h() {
			var e = u(".mkdf-portfolio-list-holder.mkdf-pl-has-animation");
			e.length && e.each(function () {
				u(this).children(".mkdf-pl-inner").children("article").each(function (e) {
					var t = u(this);
					t.appear(function () {
						t.addClass("mkdf-item-show"), setTimeout(function () {
							t.addClass("mkdf-item-shown")
						}, 1e3)
					}, {
						accX: 0,
						accY: 0
					})
				})
			})
		}

		function i() {
			var e = u(".mkdf-portfolio-list-holder.mkdf-pl-masonry");
			e.length && e.each(function () {
				var e = u(this),
					t = e.children(".mkdf-pl-inner"),
					a = e.find(".mkdf-pl-grid-sizer").width();
				t.isotope({
					layoutMode: "packery",
					itemSelector: "article",
					percentPosition: !0,
					packery: {
						gutter: ".mkdf-pl-grid-gutter",
						columnWidth: ".mkdf-pl-grid-sizer"
					}
				}), mkdf.modules.common.setFixedImageProportionSize(e, e.find("article"), a), setTimeout(function () {
					mkdf.modules.common.mkdfInitParallax()
				}, 600), t.isotope("layout").css("opacity", "1")
			})
		}

		function n() {
			function t(e) {
				var t = e.outerHeight() + e.offset().top - mkdfGlobalVars.vars.mkdfAddForAdminBar;
				!e.hasClass("mkdf-pl-infinite-scroll-started") && mkdf.scroll + mkdf.windowHeight > t && o(e)
			}
			var e = u(".mkdf-portfolio-list-holder"),
				o = function (a, d) {
					var o, i, n = a.find(".mkdf-pl-inner");
					void 0 !== a.data("max-num-pages") && !1 !== a.data("max-num-pages") && (i = a.data("max-num-pages")), a.hasClass("mkdf-pl-pag-standard") && a.data("next-page", d), a.hasClass("mkdf-pl-pag-infinite-scroll") && a.addClass("mkdf-pl-infinite-scroll-started");
					var e = mkdf.modules.common.getLoadMoreData(a),
						s = a.find(".mkdf-pl-loading");
					if ((o = e.nextPage) <= i || 0 === i) {
						a.hasClass("mkdf-pl-pag-standard") ? (s.addClass("mkdf-showing mkdf-standard-pag-trigger"), a.addClass("mkdf-pl-pag-standard-animate")) : s.addClass("mkdf-showing");
						var t = mkdf.modules.common.setLoadMoreAjaxData(e, "fiorello_core_portfolio_ajax_load_more");
						u.ajax({
							type: "POST",
							data: t,
							url: mkdfGlobalVars.vars.mkdfAjaxUrl,
							success: function (e) {
								a.hasClass("mkdf-pl-pag-standard") || o++, a.data("next-page", o);
								var t = u.parseJSON(e).html;
								a.hasClass("mkdf-pl-pag-standard") ? (r(a, i, o), a.waitForImages(function () {
									a.hasClass("mkdf-pl-masonry") ? l(a, n, s, t) : a.hasClass("mkdf-pl-gallery") && a.hasClass("mkdf-pl-has-filter") ? l(a, n, s, t) : m(a, n, s, t)
								})) : a.waitForImages(function () {
									a.hasClass("mkdf-pl-masonry") ? 1 === d ? l(a, n, s, t) : f(a, n, s, t) : a.hasClass("mkdf-pl-gallery") && a.hasClass("mkdf-pl-has-filter") && 1 != d ? f(a, n, s, t) : 1 === d ? m(a, n, s, t) : c(n, s, t)
								}), a.hasClass("mkdf-pl-infinite-scroll-started") && a.removeClass("mkdf-pl-infinite-scroll-started")
							}
						})
					}
					o === i && (a.addClass("mkdf-pl-all-loaded"), a.find(".mkdf-pl-load-more-holder").hide())
				},
				r = function (e, t, a) {
					var d = e.find(".mkdf-pl-standard-pagination"),
						o = d.find("li.mkdf-pl-pag-number"),
						i = d.find("li.mkdf-pl-pag-prev a"),
						n = d.find("li.mkdf-pl-pag-next a");
					o.removeClass("mkdf-pl-pag-active"), o.eq(a - 1).addClass("mkdf-pl-pag-active"), i.data("paged", a - 1), n.data("paged", a + 1), 1 < a ? i.css({
						opacity: "1"
					}) : i.css({
						opacity: "0"
					}), a === t ? n.css({
						opacity: "0"
					}) : n.css({
						opacity: "1"
					})
				},
				l = function (e, t, a, d) {
					t.find("article").remove(), t.append(d), mkdf.modules.common.setFixedImageProportionSize(e, t.find("article"), t.find(".mkdf-pl-grid-sizer").width()), t.isotope("reloadItems").isotope({
						sortBy: "original-order"
					}), a.removeClass("mkdf-showing mkdf-standard-pag-trigger"), e.removeClass("mkdf-pl-pag-standard-animate"), setTimeout(function () {
						t.isotope("layout"), h(), mkdf.modules.common.mkdfInitParallax(), mkdf.modules.common.mkdfPrettyPhoto()
					}, 600)
				},
				m = function (e, t, a, d) {
					a.removeClass("mkdf-showing mkdf-standard-pag-trigger"), e.removeClass("mkdf-pl-pag-standard-animate"), t.html(d), h(), mkdf.modules.common.mkdfInitParallax(), mkdf.modules.common.mkdfPrettyPhoto()
				},
				f = function (e, t, a, d) {
					var o = e.find(".mkdf-pl-filter.mkdf-pl-current");
					t.append(d), mkdf.modules.common.setFixedImageProportionSize(e, t.find("article"), t.find(".mkdf-pl-grid-sizer").width()), t.isotope("reloadItems").isotope({
						sortBy: "original-order"
					}), a.removeClass("mkdf-showing"), t.children(o.attr("data-filter")).length === o.attr("data-items-number") && e.find(".mkdf-pl-load-more-holder").hide(), setTimeout(function () {
						t.isotope("layout"), h(), mkdf.modules.common.mkdfInitParallax(), mkdf.modules.common.mkdfPrettyPhoto()
					}, 600)
				},
				c = function (e, t, a) {
					t.removeClass("mkdf-showing"), e.append(a), h(), mkdf.modules.common.mkdfInitParallax(), mkdf.modules.common.mkdfPrettyPhoto()
				};
			return {
				init: function () {
					e.length && e.each(function () {
						var e = u(this);
						e.hasClass("mkdf-pl-pag-standard") && function (d) {
							var e = d.find(".mkdf-pl-standard-pagination li");
							e.length && e.each(function () {
								var t = u(this).children("a"),
									a = 1;
								t.on("click", function (e) {
									e.preventDefault(), e.stopPropagation(), void 0 !== t.data("paged") && !1 !== t.data("paged") && (a = t.data("paged")), o(d, a)
								})
							})
						}(e), e.hasClass("mkdf-pl-pag-load-more") && function (t) {
							t.find(".mkdf-pl-load-more a").on("click", function (e) {
								e.preventDefault(), e.stopPropagation(), o(t)
							})
						}(e), e.hasClass("mkdf-pl-pag-infinite-scroll") && t(e)
					})
				},
				scroll: function () {
					e.length && e.each(function () {
						var e = u(this);
						e.hasClass("mkdf-pl-pag-infinite-scroll") && t(e)
					})
				},
				getMainPagFunction: function (e, t) {
					o(e, t)
				}
			}
		} (mkdf.modules.portfolioList = e).mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, e.mkdfOnWindowResize = d, e.mkdfOnWindowScroll = o, u(document).ready(t), u(window).on("load", a), u(window).resize(d), u(window).scroll(o)
	}(jQuery),
	function (i) {
		"use strict";
		var e = {};

		function t() {
			! function () {
				var e = i(".mkdf-portfolio-slider-holder.mkdf-ps-fullscreen");
				e.length && e.each(function () {
					var e = i(this),
						a = !1;
					if (e.hasClass("mkdf-ps-scrollable")) {
						e.on("translate.owl.carousel", function () {
							a = !0
						}), e.on("translated.owl.carousel", function () {
							a = !1
						});
						! function () {
							var t = e.find(".mkdf-owl-slider");
							t.on("mousewheel", ".owl-stage", function (e) {
								a || (0 < e.deltaY ? t.trigger("prev.owl") : t.trigger("next.owl"), e.preventDefault())
							})
						}()
					}
				})
			}()
		}

		function a() {
			! function () {
				var e = i(".mkdf-portfolio-slider-holder.mkdf-ps-fullscreen");
				e.length && e.each(function () {
					var t, e = i(this),
						a = 0,
						d = e.find(".owl-dots").outerHeight(!0),
						o = function () {
							e.hasClass("mkdf-ps-minus-header") && (a = 1024 < mkdf.windowWidth ? i(".mkdf-page-header").outerHeight() : i(".mkdf-mobile-header").outerHeight()), mkdf.body.hasClass("admin-bar") && (a += i("#wpadminbar").outerHeight()), t = mkdf.windowHeight - a - d, e.find(".owl-item").each(function () {
								var e = i(this);
								e.css({
									height: t
								})
							}), e.find(".owl-nav").css({
								height: t
							})
						};
					o(), i(window).on("resize", function () {
						o()
					})
				})
			}()
		}

		function d() { }

		function o() { } (mkdf.modules.portfolioSlider = e).mkdfOnDocumentReady = t, e.mkdfOnWindowLoad = a, e.mkdfOnWindowResize = d, e.mkdfOnWindowScroll = o, i(document).ready(t), i(window).on("load", a), i(window).resize(d), i(window).scroll(o)
	}(jQuery),
	function (d) {
		"use strict";
		d(window).on("load", function () {
			! function () {
				var e = d(".mkdf-instagram-carousel");
				e.length && e.each(function () {
					var e = d(this),
						t = e.find(".owl-stage"),
						a = t.outerWidth() + 1;
					t.css("width", a)
				})
			}()
		})
	}(jQuery);