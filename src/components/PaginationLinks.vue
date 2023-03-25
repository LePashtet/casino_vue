<template>
  <div>

    <ul v-if="totalPage > 1 && totalPage < 8" class="pagination">
      <li v-if="withNextPrev" :class="disablePrev">
        <router-link v-if="!disablePrev" :to="link + (currentPage - 1).toString()" class="button-style">
          <font-awesome-icon icon="chevron-left" />
        </router-link>
        <a v-else class="button-style">
          <font-awesome-icon icon="chevron-left" />
        </a>
      </li>
      <li v-for="(n, key) in totalPage" :class="n === selected ? 'active ' : ''" :key="key">
        <router-link :to="link + n.toString()">{{ n }}</router-link>
      </li>
      <li v-if="withNextPrev" :class="disableNext">
        <router-link v-if="!disableNext" :to="link + (currentPage + 1).toString()" class="button-style">
          <font-awesome-icon icon="chevron-right" />
        </router-link>
        <a v-else class="button-style">
          <font-awesome-icon icon="chevron-right" />
        </a>
      </li>
    </ul>

    <ul v-else-if="totalPage >= 8" class="pagination">
      <li v-if="withNextPrev" :class="disablePrev">
        <router-link v-if="!disablePrev" :to="link + (currentPage - 1).toString()" class="button-style">
          <font-awesome-icon icon="chevron-left" />
        </router-link>
        <a v-else class="button-style">
          <font-awesome-icon icon="chevron-left" />
        </a>
      </li>
      <li v-for="(n, key) in pages" v-if="n.show" :class="n.content === selected ? 'active ' : '' + n.disable"  :key="key">
        <router-link v-if="n.disable !== 'disabled'" :to="link + (n.content).toString()">{{ n.content }}</router-link>
        <a v-else>{{ n.content }}</a>
      </li>
      <li v-if="withNextPrev" :class="disableNext">
        <router-link v-if="!disableNext" :to="link + (currentPage + 1).toString()" class="button-style">
          <font-awesome-icon icon="chevron-right" />
        </router-link>
        <a v-else class="button-style">
          <font-awesome-icon icon="chevron-right" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'PaginationLinks',
    props : {
      totalPage : {
        type : Number,
        required: true
      },
      currentPage : {
        type : Number,
        default: 1,
      },
      link: {
        type : String,
      }
    },
    data() {
      return {
        disableNext : '',
        disablePrev : '',
        pageRange: 3,
        withNextPrev: true,
        nextText: 'Next',
        prevText: 'Prev',
      }
    },
    mounted() {
      this.disablePrevNext()
    },
    computed: {
      pages : function()
      {
        let items = [];


        for (let i = 0; i < this.totalPage; i++) {
          items[i] = {
            content: i + 1,
            disable: '',
            show: false
          }
        }

        let page1 = {
          content: "...",
          disable : 'disabled',
          show : false
        }

        let page2 = {
          content: "...",
          disable : 'disabled',
          show : false
        }

        items.splice(1, 0, page1);
        items.splice(items.length-1, 0, page2);

        for (let i = 0; i < items.length; i++) {
          if(i === 0 || i === items.length-1)
            items[i].show = true;

          if(this.selected <= this.pageRange)
          {
            if(this.selected === this.pageRange)
            {
              if(i >= 2 && i <= this.pageRange+1)
                items[i].show = true;
            }
            else {
              if(i >= 2 && i <= this.pageRange)
                items[i].show = true;
            }

            items[items.length-2].show = true;
          }
          else if (this.selected > this.pageRange) {
            if(i >= this.selected-1 && (this.selected + 2) < items.length-2 && i <= this.selected+1)
            {
              items[1].show = true;
              items[items.length-2].show = true;
              items[i].show = true;
            }
            else if (i >= items.length - 2 - this.pageRange &&(this.selected + 2) >= items.length-2)
            {
              items[1].show = true;
              items[items.length-2].show = false;
              items[i].show = true;
            }
          }

        }

        return items;
      },
      selected: function () {
        return this.currentPage
      }
    },
    methods : {

      disablePrevNext : function()
      {
        this.disablePrev = this.selected === 1 ? 'disabled' : '';
        this.disableNext = this.selected === this.totalPage ? 'disabled' : '';
      }
    },
  }
</script>

<style lang="scss" src="../styles/pagination.scss"></style>
