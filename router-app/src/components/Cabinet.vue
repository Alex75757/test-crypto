<template>
  <div>
    <div class="container">
      <vue-resizable class="resizable" ref="resizableComponent"
                     v-for="form in VR"
                     :key="form.index"
                     :dragSelector="form.dragSelector"
                     :active="form.handlers" 
                     :fit-parent="form.fit" 
                     :maximize="form.maximize"
                     :max-width="checkEmpty(form.maxW)" 
                     :max-height="checkEmpty(form.maxH)"
                     :min-width="checkEmpty(form.minW)" 
                     :min-height="checkEmpty(form.minH)"
                     :width="form.width" 
                     :height="form.height"
                     :left="form.left" 
                     :top="form.top"
                     :index="form.index"
                     @mount="eHandler"
                     @resize:move="eHandler" @resize:start="eHandler" @resize:end="eHandler"
                     @drag:move="eHandler" @drag:start="eHandler" @drag:end="eHandler" @maximize="eHandler"
      >
        <div class="block">
          <div class="drag-container-1"><span>VR {{ form.index }} _drag_1</span></div>
          <div class="table-container">
            <table>
              <tr>
                <td>w:{{ form.width }}</td>
                <td>h:{{ form.height }}</td>
              </tr>
              <tr>
                <td>l:{{ form.left }}</td>
                <td>t:{{ form.top }}</td>
              </tr>
            </table>
          </div>
          <div class="drag-container-2"> drag_2 </div>
        </div>
      </vue-resizable>
    </div>
  </div>
</template>

<script>
import VueResizable from '../components/vue-resizable'

export default {
  name: "Cabinet",
  components: { VueResizable },
  data() {
    const tW = 150;
    const tH = 150;
    
    return {
     
      VR:[{
      handlers: ['r', 'rb', 'b', 'lb', 'l', 'lt', 't', 'rt'],
      left: 1, top: 1,
      height: null, width: null,
      maxW: 200, maxH: 400,
      minW: 100, minH: 100,
      fit: true, maximize: false, event: '',
      dragSelector: ".drag-container-1, .drag-container-2",
      activeForm: false,
      index : 0,
      },
      {
      handlers: ['r', 'rb', 'b', 'lb', 'l', 'lt', 't', 'rt'],
      left: 2, top: 2,
      height: null, width: null,
      maxW: 250, maxH: 250,
      minW: 100, minH: 100,
      fit: true, maximize: false, event: '',
      dragSelector: ".drag-container-1, .drag-container-2",
      activeForm: false,
      index : 1,
      },
      {
      handlers: ['r', 'rb', 'b', 'lb', 'l', 'lt', 't', 'rt'],
      left: 3, top: 3,
      height: tH, width: tW,
      maxW: 351, maxH: 351,
      minW: 100, minH: 100,
      fit: true, maximize: false, event: '',
      dragSelector: ".drag-container-1, .drag-container-2",
      activeForm: false,
      index : 2,
      }]
    };
  },
  created() {
   
    for (let i=0; i<this.VR.length; i++){
          if (localStorage.getItem('VR'+i+'.width') && localStorage.getItem('VR'+i+'.height')) {
          
           this.VR[i].width =  parseInt(localStorage.getItem('VR'+i+'.width'));
           this.VR[i].height = parseInt(localStorage.getItem('VR'+i+'.height'));
           this.VR[i].left = parseInt(localStorage.getItem('VR'+i+'.left')) ;
           this.VR[i].top =  parseInt(localStorage.getItem('VR'+i+'.top'));
          } else {
           this.VR[i].width = 100*(1+i);
           this.VR[i].height = 100*(1+i);
           this.VR[i].left = 10*(1+i);
           this.VR[i].top = 10*(1+i);
          }
    }
  },
  mounted() {
    let resizableForms = document.querySelectorAll('.resizable-component');
    Array.from(resizableForms).forEach((form,j) =>{
         
      form.addEventListener('click', () =>{
        
        Array.from(resizableForms).forEach((form2, i) =>{
          form2.style.zIndex = 100;
          this.VR[i].activeForm =false;
        })
 
          this.VR[j].activeForm = true;
          form.style.zIndex = 200;

      })
    });

  },
  
  methods: {
    
    eHandler(data) {
     let i = data.index;
  
          this.VR[i].width = parseInt(data.width);
          this.VR[i].height = parseInt(data.height);
          this.VR[i].left = parseInt(data.left);
          this.VR[i].top = parseInt(data.top);
          this.VR[i].event = data.eventName;
          if (data.eventName === 'maximize') {
              this.VR[i].maximize = data.state;
            }
          localStorage.setItem('VR'+i+'.width', this.VR[i].width );
          localStorage.setItem('VR'+i+'.left', this.VR[i].left );
          localStorage.setItem('VR'+i+'.top', this.VR[i].top );
          localStorage.setItem('VR'+i+'.height', this.VR[i].height );
  
    },

    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    }
  },
  filters: {
    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    }
  }

}
</script>

<style scoped>
.block {
  height: 100%;
  width: 100%;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
<style>
body, html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
}

.container {
  width: 80%;
  height: 500px;
  display: block;
  border: 1px solid #dddddd;
  background: #ffffff;
  color: #333333;;
  position: relative;
  margin: 0 auto;
}

#block1 {
  border: solid black 1px;
  height: 300px;
  width: 300px;
  display: inline-block;
  float: left;
}

.resizable {
  background-position: top left;
  width: 150px;
  height: 150px;
  padding: 0;
  border: 1px solid #003eff;
  background: #007fff;
  font-weight: normal;
  color: #ffffff;
  position: relative;
}

.table-block {
  display: table;
}

.table-row {
  display: table-row;
  text-align: center;
}

.table-cell {
  width: 50%;
  display: inline-block
}

.table-input {
  width: 50px
}

.drag-container-1, .drag-container-2 {
  width: 100%;
  height: 20px;
  background: rgb(50, 169, 199);
  color: white;
  text-align: center;
  cursor: pointer;
}

.table-container {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>