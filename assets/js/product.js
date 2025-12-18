function changeImg(src) {
            document.getElementById('main-product-img').src = src;
        }

        function changeQty(amt) {
            let input = document.getElementById('qty');
            let val = parseInt(input.value) + amt;
            if (val >= 1) input.value = val;
        }

        document.querySelectorAll('.size-box').forEach(box => {
            box.addEventListener('click', function() {
                document.querySelectorAll('.size-box').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });