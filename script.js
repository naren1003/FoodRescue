function SubmitFirst() {
    alert("Submitted");
}

function addName() {
    var extra = document.getElementById("extra");

    if (!extra) {
        return;
    }

    extra.innerHTML = `
    <div class="sign-in-input">
        <p style="text-align: left; margin-bottom: 10px;"><b>Restaurant/Organization Name</b></p>
        <input type="text" name="name" placeholder="Your Restaurant Name" required>
    </div>`;
}

(function () {
    var donationData = [
        { donor: "Green Bowl Cafe", type: "Veg Meals", quantity: 32, ngo: "Hope Shelter", x: 18, y: 30, color: "#1d8660" },
        { donor: "Spice Route", type: "Rice Packs", quantity: 24, ngo: "Care Circle", x: 38, y: 68, color: "#e08700" },
        { donor: "Fresh Fork", type: "Sandwiches", quantity: 18, ngo: "Urban Relief", x: 60, y: 26, color: "#0f9d7a" },
        { donor: "Harvest Hub", type: "Dinner Boxes", quantity: 41, ngo: "Night Mission", x: 77, y: 58, color: "#188a5a" }
    ];

    document.addEventListener("DOMContentLoaded", function () {
        animateImpactStats();
        enhanceContactForm();
        enhanceAuthForms();
        enhanceFeatureCards();
        enhanceTeamCards();
        buildAvailableFoodExperience();
        enhanceAvailableOrderForm();
        enhanceBulkPrebookForm();
    });

    function animateImpactStats() {
        var statNodes = document.querySelectorAll(".section-2 h1");

        statNodes.forEach(function (node) {
            var label = node.textContent.trim();
            var match = label.match(/^([\d.]+)([A-Za-z%+]+)$/);

            if (!match) {
                return;
            }

            var target = Number(match[1]);
            var suffix = match[2];
            var duration = 1600;
            var startTime = null;

            function formatValue(value) {
                var formatted = target % 1 === 0 ? Math.round(value).toString() : value.toFixed(1);
                return formatted + suffix;
            }

            function step(timestamp) {
                if (!startTime) {
                    startTime = timestamp;
                }

                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                node.textContent = formatValue(target * eased);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    node.textContent = label;
                }
            }

            requestAnimationFrame(step);
        });
    }

    function enhanceContactForm() {
        var form = document.querySelector(".contact-section2 form");

        if (!form) {
            return;
        }

        var submitButton = form.querySelector(".submit");
        var feedback = document.createElement("p");
        var storageKey = "foodrescue-contact-draft";
        feedback.style.margin = "14px 20px 0";
        feedback.style.fontWeight = "600";
        feedback.style.display = "none";
        form.appendChild(feedback);

        restoreDraft(form, storageKey);
        attachDraftPersistence(form, storageKey);

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var inputs = form.querySelectorAll("input[type='text'], input[type='email'], textarea");
            var isValid = true;

            inputs.forEach(function (input) {
                var value = input.value.trim();
                input.style.borderColor = value ? "#1d8660" : "#d93025";
                if (!value) {
                    isValid = false;
                }
            });

            if (!isValid) {
                feedback.textContent = "Please fill in all the fields so we can get back to you.";
                feedback.style.color = "#d93025";
                feedback.style.display = "block";
                return;
            }

            feedback.textContent = "Message sent successfully. We'll get back to you soon.";
            feedback.style.color = "#1d8660";
            feedback.style.display = "block";

            if (submitButton) {
                submitButton.value = "Message Sent";
            }

            form.reset();
            window.localStorage.removeItem(storageKey);
        });
    }

    function enhanceAuthForms() {
        var authForms = document.querySelectorAll(".section-2-signin form");

        authForms.forEach(function (form, index) {
            var passwordInputs = form.querySelectorAll("input[type='password']");
            var submitControl = form.querySelector(".submit");
            var storageKey = "foodrescue-auth-draft-" + index;

            if (passwordInputs.length) {
                var hint = document.createElement("p");
                hint.style.margin = "0 0 14px";
                hint.style.color = "#628478";
                hint.style.fontSize = "14px";
                form.appendChild(hint);

                passwordInputs[0].addEventListener("input", function () {
                    var length = passwordInputs[0].value.length;

                    if (!length) {
                        hint.textContent = "";
                        return;
                    }

                    if (length < 6) {
                        hint.textContent = "Password strength: weak";
                        hint.style.color = "#d93025";
                    } else if (length < 10) {
                        hint.textContent = "Password strength: medium";
                        hint.style.color = "#e08700";
                    } else {
                        hint.textContent = "Password strength: strong";
                        hint.style.color = "#1d8660";
                    }
                });
            }

            restoreDraft(form, storageKey);
            attachDraftPersistence(form, storageKey);

            form.addEventListener("submit", function (event) {
                event.preventDefault();

                if (submitControl) {
                    var originalValue = submitControl.value;
                    submitControl.value = originalValue.indexOf("Create") === 0 ? "Account Ready" : "Signed In";
                    window.setTimeout(function () {
                        submitControl.value = originalValue;
                    }, 1600);
                }

                window.localStorage.removeItem(storageKey);
            });
        });
    }

    function enhanceFeatureCards() {
        var cards = document.querySelectorAll(".section-3-flexbox-each, .about-section-3 .section-3-flexbox-each");

        cards.forEach(function (card, index) {
            card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";

            card.addEventListener("mouseenter", function () {
                card.style.transform = "translateY(-6px)";
                card.style.boxShadow = "0 16px 28px rgba(29, 134, 96, 0.14)";
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "5px 5px rgba(0,0,0,0.1)";
            });

            if (card.closest(".section-3") || card.closest(".about-section-3")) {
                card.style.opacity = "0";
                card.style.transform = "translateY(20px)";
                card.style.transition = "transform 0.45s ease, opacity 0.45s ease, box-shadow 0.25s ease";

                window.setTimeout(function () {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 120 + index * 120);
            }
        });
    }

    function enhanceTeamCards() {
        var teamCards = document.querySelectorAll(".about-section-5 .section-3-flexbox-each");
        var messages = [
            "Leads partnerships and keeps the rescue network growing.",
            "Coordinates daily pickups and food safety checks.",
            "Connects NGOs and communities with available donations.",
            "Builds the digital tools that keep deliveries moving."
        ];

        teamCards.forEach(function (card, index) {
            var note = document.createElement("p");
            note.textContent = messages[index] || "Helping the platform serve more communities.";
            note.style.color = "#628478";
            note.style.textAlign = "center";
            note.style.marginTop = "6px";
            note.style.maxWidth = "210px";
            note.style.display = "none";
            card.appendChild(note);
            card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";

            card.addEventListener("mouseenter", function () {
                note.style.display = "block";
                card.style.transform = "translateY(-6px)";
                card.style.boxShadow = "0 16px 28px rgba(29, 134, 96, 0.14)";
            });

            card.addEventListener("mouseleave", function () {
                note.style.display = "none";
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "5px 5px rgba(0,0,0,0.1)";
            });
        });
    }

    function enhanceAvailableOrderForm() {
        var form = document.getElementById("available-order-form");

        if (!form) {
            return;
        }

        var sourceSelect = document.getElementById("food-source");
        var mealCount = document.getElementById("meal-count");
        var summaryBox = document.getElementById("order-summary-box");
        var feedback = document.getElementById("order-feedback");
        var storageKey = "foodrescue-available-order";

        donationData.forEach(function (entry, index) {
            var option = document.createElement("option");
            option.value = index;
            option.textContent = entry.donor + " - " + entry.type + " (" + entry.quantity + " meals)";
            sourceSelect.appendChild(option);
        });

        restoreDraft(form, storageKey);
        attachDraftPersistence(form, storageKey);

        function updateSummary() {
            var selectedEntry = donationData[sourceSelect.value];
            var mealsNeeded = Number(mealCount.value || 0);

            if (!selectedEntry) {
                summaryBox.textContent = "Choose a donation to see availability details.";
                return;
            }

            var remaining = selectedEntry.quantity - mealsNeeded;
            var status = remaining >= 0
                ? "This request can be fulfilled from the currently listed meals."
                : "This request is larger than the listed quantity. Consider the bulk pre-book page.";

            summaryBox.innerHTML = "<b>" + selectedEntry.donor + "</b> is offering " + selectedEntry.quantity + " " + selectedEntry.type.toLowerCase() + ".<br>Requested: " + (mealsNeeded || 0) + " meals.<br>" + status;
        }

        sourceSelect.addEventListener("change", updateSummary);
        mealCount.addEventListener("input", updateSummary);
        updateSummary();

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var selectedEntry = donationData[sourceSelect.value];
            var mealsNeeded = Number(mealCount.value || 0);

            if (!selectedEntry) {
                feedback.textContent = "Please choose a food source before placing the order.";
                feedback.style.color = "#d93025";
                return;
            }

            if (mealsNeeded < 1) {
                feedback.textContent = "Please enter a valid meal count.";
                feedback.style.color = "#d93025";
                return;
            }

            if (mealsNeeded > selectedEntry.quantity) {
                feedback.textContent = "This request is larger than the available stock. Please use the bulk pre-book option.";
                feedback.style.color = "#d93025";
                return;
            }

            feedback.textContent = "Order placed for " + mealsNeeded + " meals from " + selectedEntry.donor + ".";
            feedback.style.color = "#1d8660";
            window.localStorage.removeItem(storageKey);
            form.reset();
            summaryBox.textContent = "Choose a donation to see availability details.";
        });
    }

    function enhanceBulkPrebookForm() {
        var form = document.getElementById("bulk-prebook-form");

        if (!form) {
            return;
        }

        var mealCount = document.getElementById("bulk-meal-count");
        var dateInput = document.getElementById("bulk-date");
        var mealType = document.getElementById("bulk-meal-type");
        var summaryBox = document.getElementById("bulk-summary-box");
        var feedback = document.getElementById("bulk-feedback");
        var storageKey = "foodrescue-bulk-prebook";
        var today = new Date();
        var minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        dateInput.min = formatDate(minDate);

        restoreDraft(form, storageKey);
        attachDraftPersistence(form, storageKey);

        function updateBulkSummary() {
            var meals = Number(mealCount.value || 0);
            var selectedDate = dateInput.value;
            var selectedMealType = mealType.value;

            if (!meals && !selectedDate && !selectedMealType) {
                summaryBox.textContent = "Fill the form to preview your bulk request plan.";
                return;
            }

            summaryBox.innerHTML = "<b>Bulk request preview</b><br>Meals: " + (meals || 0) + "<br>Meal type: " + (selectedMealType || "Not selected") + "<br>Requested date: " + (selectedDate || "Not selected") + "<br>Our team will review donor capacity and contact you for confirmation.";
        }

        mealCount.addEventListener("input", updateBulkSummary);
        dateInput.addEventListener("change", updateBulkSummary);
        mealType.addEventListener("change", updateBulkSummary);
        updateBulkSummary();

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var meals = Number(mealCount.value || 0);

            if (meals < 50) {
                feedback.textContent = "Bulk pre-booking is available for requests of 50 meals or more.";
                feedback.style.color = "#d93025";
                return;
            }

            if (!dateInput.value) {
                feedback.textContent = "Please select a future date for the request.";
                feedback.style.color = "#d93025";
                return;
            }

            feedback.textContent = "Bulk order pre-booked successfully. Our team will contact you to confirm donor availability.";
            feedback.style.color = "#1d8660";
            window.localStorage.removeItem(storageKey);
            form.reset();
            dateInput.min = formatDate(minDate);
            summaryBox.textContent = "Fill the form to preview your bulk request plan.";
        });
    }

    function buildAvailableFoodExperience() {
        var host = document.querySelector(".available-section-2");

        if (!host) {
            return;
        }

        host.innerHTML = "";
        host.style.display = "block";
        host.style.background = "linear-gradient(135deg, #f4fbf7 0%, #ffffff 100%)";
        host.style.boxShadow = "0 18px 40px rgba(29, 134, 96, 0.12)";

        var intro = document.createElement("div");
        intro.style.textAlign = "center";
        intro.style.marginBottom = "24px";
        intro.innerHTML = "<h2 style='margin-bottom:8px;'>Live Rescue Board</h2><p style='margin:0; color:#628478;'>Canvas-powered matching between surplus meals and nearby NGOs.</p>";

        var layout = document.createElement("div");
        layout.style.display = "grid";
        layout.style.gridTemplateColumns = "minmax(0, 2fr) minmax(280px, 1fr)";
        layout.style.gap = "24px";
        layout.style.alignItems = "stretch";

        var canvasCard = document.createElement("div");
        canvasCard.style.background = "#fff";
        canvasCard.style.borderRadius = "18px";
        canvasCard.style.padding = "18px";
        canvasCard.style.boxShadow = "0 14px 30px rgba(0, 0, 0, 0.08)";

        var canvasHeader = document.createElement("div");
        canvasHeader.style.display = "flex";
        canvasHeader.style.justifyContent = "space-between";
        canvasHeader.style.alignItems = "center";
        canvasHeader.style.gap = "12px";
        canvasHeader.style.flexWrap = "wrap";
        canvasHeader.innerHTML = "<div><h3 style='margin:0;'>Donation Flow Map</h3><p style='margin:6px 0 0; color:#628478;'>Click a food node to highlight its delivery route.</p></div>";

        var actionWrap = document.createElement("div");
        actionWrap.style.display = "flex";
        actionWrap.style.gap = "10px";
        actionWrap.style.flexWrap = "wrap";

        var simulateButton = createActionButton("Simulate Match", "#1d8660", "#ffffff");
        var redrawButton = createActionButton("Redraw Routes", "#eef7f3", "#145c44");
        var drawModeButton = createActionButton("Draw Custom Route", "#fff7e8", "#9a6700");
        var clearSketchButton = createActionButton("Clear Sketch", "#f8f8f8", "#5f6368");

        actionWrap.appendChild(simulateButton);
        actionWrap.appendChild(redrawButton);
        actionWrap.appendChild(drawModeButton);
        actionWrap.appendChild(clearSketchButton);
        canvasHeader.appendChild(actionWrap);

        var canvas = document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 460;
        canvas.style.width = "100%";
        canvas.style.height = "460px";
        canvas.style.borderRadius = "14px";
        canvas.style.background = "linear-gradient(180deg, #f8fffb 0%, #eef7f2 100%)";
        canvas.style.cursor = "pointer";
        canvas.style.display = "block";

        var summary = document.createElement("p");
        summary.style.margin = "14px 0 0";
        summary.style.color = "#145c44";
        summary.style.fontWeight = "600";
        summary.textContent = "Active route: all pickups shown";

        canvasCard.appendChild(canvasHeader);
        canvasCard.appendChild(canvas);
        canvasCard.appendChild(summary);

        var sidePanel = document.createElement("div");
        sidePanel.style.display = "flex";
        sidePanel.style.flexDirection = "column";
        sidePanel.style.gap = "14px";

        var panelTitle = document.createElement("div");
        panelTitle.style.background = "#fff";
        panelTitle.style.borderRadius = "18px";
        panelTitle.style.padding = "20px";
        panelTitle.style.boxShadow = "0 14px 30px rgba(0, 0, 0, 0.08)";
        panelTitle.innerHTML = "<h3 style='margin-top:0;'>Today's Availability</h3><p style='margin:8px 0 0; color:#628478;'>These entries are being rendered dynamically from JavaScript data.</p>";
        sidePanel.appendChild(panelTitle);

        donationData.forEach(function (entry, index) {
            var card = document.createElement("button");
            card.type = "button";
            card.style.border = "none";
            card.style.textAlign = "left";
            card.style.padding = "18px";
            card.style.background = "#fff";
            card.style.borderRadius = "18px";
            card.style.boxShadow = "0 14px 28px rgba(0, 0, 0, 0.08)";
            card.style.cursor = "pointer";
            card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
            card.innerHTML = "<strong style='display:block; margin-bottom:8px; color:#163b2d;'>" + entry.donor + "</strong><span style='display:block; color:#628478; margin-bottom:6px;'>" + entry.type + "</span><span style='display:block; color:#145c44; font-weight:600;'>" + entry.quantity + " meals reserved for " + entry.ngo + "</span>";

            card.addEventListener("mouseenter", function () {
                card.style.transform = "translateY(-3px)";
                card.style.boxShadow = "0 18px 34px rgba(29, 134, 96, 0.16)";
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 14px 28px rgba(0, 0, 0, 0.08)";
            });

            card.addEventListener("click", function () {
                activeIndex = index;
                summary.textContent = "Active route: " + entry.donor + " to " + entry.ngo + " (" + entry.quantity + " meals)";
                drawScene();
            });

            sidePanel.appendChild(card);
        });

        layout.appendChild(canvasCard);
        layout.appendChild(sidePanel);
        host.appendChild(intro);
        host.appendChild(layout);

        var context = canvas.getContext("2d");
        var activeIndex = -1;
        var pulse = 0;
        var pointer = { x: -1000, y: -1000 };
        var hoveringIndex = -1;
        var drawMode = false;
        var sketchLines = [];
        var activeSketch = null;

        var tips = document.createElement("p");
        tips.style.margin = "10px 0 0";
        tips.style.color = "#628478";
        tips.style.fontSize = "14px";
        tips.textContent = "Tip: click nodes, use arrow keys to switch routes, or turn on draw mode to sketch a custom delivery path.";
        canvasCard.appendChild(tips);

        canvas.addEventListener("mousemove", function (event) {
            var rect = canvas.getBoundingClientRect();
            pointer.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
            pointer.y = ((event.clientY - rect.top) / rect.height) * canvas.height;

            if (drawMode && activeSketch) {
                activeSketch.push({ x: pointer.x, y: pointer.y });
                drawScene();
            }
        });

        canvas.addEventListener("mouseleave", function () {
            pointer.x = -1000;
            pointer.y = -1000;
            hoveringIndex = -1;
            activeSketch = null;
            drawScene();
        });

        canvas.addEventListener("click", function () {
            if (drawMode) {
                return;
            }

            if (hoveringIndex > -1) {
                activeIndex = hoveringIndex;
                var selected = donationData[hoveringIndex];
                summary.textContent = "Active route: " + selected.donor + " to " + selected.ngo + " (" + selected.quantity + " meals)";
            } else {
                activeIndex = -1;
                summary.textContent = "Active route: all pickups shown";
            }

            drawScene();
        });

        canvas.addEventListener("mousedown", function () {
            if (!drawMode) {
                return;
            }

            activeSketch = [{ x: pointer.x, y: pointer.y }];
            sketchLines.push(activeSketch);
            summary.textContent = "Custom route sketch in progress";
            drawScene();
        });

        canvas.addEventListener("mouseup", function () {
            if (!drawMode) {
                return;
            }

            activeSketch = null;
            summary.textContent = "Custom route saved on the board";
            drawScene();
        });

        simulateButton.addEventListener("click", function () {
            activeIndex = (activeIndex + 1) % donationData.length;
            var current = donationData[activeIndex];
            summary.textContent = "Simulated match: " + current.type + " from " + current.donor + " reaching " + current.ngo;
            drawScene();
        });

        redrawButton.addEventListener("click", function () {
            activeIndex = -1;
            summary.textContent = "Active route: all pickups shown";
            drawScene();
        });

        drawModeButton.addEventListener("click", function () {
            drawMode = !drawMode;
            drawModeButton.textContent = drawMode ? "Exit Draw Mode" : "Draw Custom Route";
            drawModeButton.style.background = drawMode ? "#9a6700" : "#fff7e8";
            drawModeButton.style.color = drawMode ? "#ffffff" : "#9a6700";
            summary.textContent = drawMode ? "Draw mode enabled: drag on the canvas to sketch a route" : "Draw mode disabled";
            drawScene();
        });

        clearSketchButton.addEventListener("click", function () {
            sketchLines = [];
            activeSketch = null;
            summary.textContent = "Custom sketches cleared";
            drawScene();
        });

        document.addEventListener("keydown", function (event) {
            if (!host.isConnected) {
                return;
            }

            if (event.key === "ArrowRight") {
                activeIndex = (activeIndex + 1 + donationData.length) % donationData.length;
            } else if (event.key === "ArrowLeft") {
                activeIndex = (activeIndex - 1 + donationData.length) % donationData.length;
            } else if (event.key.toLowerCase() === "d") {
                drawModeButton.click();
                return;
            } else {
                return;
            }

            var entry = donationData[activeIndex];
            summary.textContent = "Keyboard focus: " + entry.donor + " to " + entry.ngo + " (" + entry.quantity + " meals)";
            drawScene();
        });

        function toCanvasPoint(xPercent, yPercent) {
            return {
                x: (xPercent / 100) * canvas.width,
                y: (yPercent / 100) * canvas.height
            };
        }

        function drawGrid() {
            context.save();
            context.strokeStyle = "rgba(29, 134, 96, 0.08)";
            context.lineWidth = 1;

            for (var x = 40; x < canvas.width; x += 60) {
                context.beginPath();
                context.moveTo(x, 0);
                context.lineTo(x, canvas.height);
                context.stroke();
            }

            for (var y = 30; y < canvas.height; y += 50) {
                context.beginPath();
                context.moveTo(0, y);
                context.lineTo(canvas.width, y);
                context.stroke();
            }

            context.restore();
        }

        function drawHubLabel(point, text, fill) {
            context.save();
            context.fillStyle = fill;
            context.font = "600 14px Segoe UI";
            context.fillText(text, point.x + 16, point.y - 14);
            context.restore();
        }

        function drawRoute(fromPoint, toPoint, color, highlighted) {
            context.save();
            context.strokeStyle = color;
            context.lineWidth = highlighted ? 5 : 3;
            context.setLineDash(highlighted ? [] : [10, 12]);
            context.lineDashOffset = -pulse * (highlighted ? 0 : 2.4);

            context.beginPath();
            context.moveTo(fromPoint.x, fromPoint.y);
            context.quadraticCurveTo((fromPoint.x + toPoint.x) / 2, Math.min(fromPoint.y, toPoint.y) - 70, toPoint.x, toPoint.y);
            context.stroke();
            context.restore();
        }

        function drawNode(point, color, label, isSelected, isHovered) {
            context.save();

            if (isSelected || isHovered) {
                context.beginPath();
                context.arc(point.x, point.y, 18 + Math.sin(pulse / 10) * 3, 0, Math.PI * 2);
                context.fillStyle = "rgba(29, 134, 96, 0.14)";
                context.fill();
            }

            context.beginPath();
            context.arc(point.x, point.y, 12, 0, Math.PI * 2);
            context.fillStyle = color;
            context.fill();

            context.beginPath();
            context.arc(point.x, point.y, 5, 0, Math.PI * 2);
            context.fillStyle = "#ffffff";
            context.fill();

            drawHubLabel(point, label, "#163b2d");
            context.restore();
        }

        function drawLegend() {
            context.save();
            context.fillStyle = "#163b2d";
            context.font = "600 16px Segoe UI";
            context.fillText("Legend", 22, 28);
            context.font = "14px Segoe UI";
            context.fillStyle = "#628478";
            context.fillText("Colored nodes: donors", 22, 52);
            context.fillText("Charcoal nodes: receiver hubs", 22, 74);
            context.fillText("Solid route: selected delivery", 22, 96);
            context.fillText("Orange sketch: custom drawn route", 22, 118);
            context.restore();
        }

        function drawSketches() {
            context.save();
            context.strokeStyle = "#e08700";
            context.lineWidth = 4;
            context.lineCap = "round";
            context.lineJoin = "round";

            sketchLines.forEach(function (line) {
                if (!line.length) {
                    return;
                }

                context.beginPath();
                context.moveTo(line[0].x, line[0].y);

                line.forEach(function (point) {
                    context.lineTo(point.x, point.y);
                });

                context.stroke();
            });

            context.restore();
        }

        function drawTooltip(entry, point) {
            var boxWidth = 210;
            var boxHeight = 78;
            var x = Math.min(point.x + 18, canvas.width - boxWidth - 14);
            var y = Math.max(point.y - boxHeight - 18, 14);

            context.save();
            context.fillStyle = "rgba(22, 59, 45, 0.94)";
            context.beginPath();
            context.roundRect(x, y, boxWidth, boxHeight, 12);
            context.fill();

            context.fillStyle = "#ffffff";
            context.font = "600 14px Segoe UI";
            context.fillText(entry.donor, x + 14, y + 24);
            context.font = "13px Segoe UI";
            context.fillText(entry.type + " | " + entry.quantity + " meals", x + 14, y + 46);
            context.fillText("Destination: " + entry.ngo, x + 14, y + 66);
            context.restore();
        }

        function drawScene() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            drawLegend();

            hoveringIndex = -1;

            donationData.forEach(function (entry, index) {
                var donorPoint = toCanvasPoint(entry.x, entry.y);
                var receiverPoint = toCanvasPoint(Math.min(entry.x + 14, 92), Math.min(entry.y + 16, 86));
                var isSelected = activeIndex === -1 || activeIndex === index;
                var isHovered = Math.hypot(pointer.x - donorPoint.x, pointer.y - donorPoint.y) < 15;

                if (isHovered) {
                    hoveringIndex = index;
                }

                drawRoute(donorPoint, receiverPoint, isSelected ? entry.color : "rgba(29, 134, 96, 0.2)", activeIndex === index);
                drawNode(receiverPoint, "#344e41", entry.ngo, false, false);
                drawNode(donorPoint, entry.color, entry.donor, activeIndex === index, isHovered);

                if (isHovered) {
                    drawTooltip(entry, donorPoint);
                }
            });

            drawSketches();
        }

        function animateCanvas() {
            pulse += 1;
            drawScene();
            requestAnimationFrame(animateCanvas);
        }

        drawScene();
        animateCanvas();
    }

    function createActionButton(text, background, color) {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = text;
        button.style.border = "none";
        button.style.borderRadius = "999px";
        button.style.padding = "10px 16px";
        button.style.fontWeight = "600";
        button.style.cursor = "pointer";
        button.style.background = background;
        button.style.color = color;
        return button;
    }

    function attachDraftPersistence(form, storageKey) {
        var fields = form.querySelectorAll("input:not([type='submit']), textarea");

        fields.forEach(function (field) {
            field.addEventListener("input", function () {
                var snapshot = {};

                fields.forEach(function (item) {
                    var key = item.name || item.placeholder || item.type;
                    snapshot[key] = item.value;
                });

                window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
            });
        });
    }

    function restoreDraft(form, storageKey) {
        var saved = window.localStorage.getItem(storageKey);

        if (!saved) {
            return;
        }

        try {
            var values = JSON.parse(saved);
            var fields = form.querySelectorAll("input:not([type='submit']), textarea");

            fields.forEach(function (field) {
                var key = field.name || field.placeholder || field.type;
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    field.value = values[key];
                }
            });
        } catch (error) {
            window.localStorage.removeItem(storageKey);
        }
    }

    function formatDate(date) {
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        return date.getFullYear() + "-" + month + "-" + day;
    }
})();
