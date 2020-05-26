<template>
  <div class="wrapper">
    <ul class="content">
      <li>显示列表1</li>
      <li>显示列表2</li>
      <li>显示列表3</li>
      <li>显示列表4</li>
      <li>显示列表5</li>
      <li>显示列表6</li>
      <li>显示列表7</li>
      <li>显示列表8</li>
      <li>显示列表9</li>
      <li>显示列表10</li>
      <li>显示列表11</li>
      <li>显示列表12</li>
      <li>显示列表13</li>
      <li>显示列表14</li>
      <li>显示列表15</li>
      <li>显示列表16</li>
      <li>显示列表17</li>
      <li>显示列表18</li>
      <li>显示列表19</li>
      <li>显示列表20</li>
      <li>显示列表21</li>
      <li>显示列表22</li>
      <li>显示列表23</li>
      <li>显示列表24</li>
      <li>显示列表25</li>
      <li>显示列表26</li>
      <li>显示列表27</li>
      <li>显示列表28</li>
      <li>显示列表29</li>
      <li>显示列表30</li>
      <li>显示列表31</li>
      <li>显示列表32</li>
      <li>显示列表33</li>
      <li>显示列表34</li>
      <li>显示列表35</li>
      <li>显示列表36</li>
      <li>显示列表37</li>
      <li>显示列表38</li>
      <li>显示列表39</li>
      <li>显示列表40</li>
      <li>显示列表41</li>
      <li>显示列表42</li>
      <li>显示列表43</li>
      <li>显示列表44</li>
      <li>显示列表45</li>
      <li>显示列表46</li>
      <li>显示列表47</li>
      <li>显示列表48</li>
      <li>显示列表49</li>
      <li>显示列表50</li>
      <li>显示列表51</li>
      <li>显示列表52</li>
      <li>显示列表53</li>
      <li>显示列表54</li>
      <li>显示列表55</li>
      <li>显示列表56</li>
      <li>显示列表57</li>
      <li>显示列表58</li>
      <li>显示列表59</li>
      <li>显示列表60</li>
      <li>显示列表61</li>
      <li>显示列表62</li>
      <li>显示列表63</li>
      <li>显示列表64</li>
      <li>显示列表65</li>
      <li>显示列表66</li>
      <li>显示列表67</li>
      <li>显示列表68</li>
      <li>显示列表69</li>
      <li>显示列表70</li>
      <li>显示列表71</li>
      <li>显示列表72</li>
      <li>显示列表73</li>
      <li>显示列表74</li>
      <li>显示列表75</li>
      <li>显示列表76</li>
      <li>显示列表77</li>
      <li>显示列表78</li>
      <li>显示列表79</li>
      <li>显示列表80</li>
      <li>显示列表81</li>
      <li>显示列表82</li>
      <li>显示列表83</li>
      <li>显示列表84</li>
      <li>显示列表85</li>
      <li>显示列表86</li>
      <li>显示列表87</li>
      <li>显示列表88</li>
      <li>显示列表89</li>
      <li>显示列表90</li>
      <li>显示列表91</li>
      <li>显示列表92</li>
      <li>显示列表93</li>
      <li>显示列表94</li>
      <li>显示列表95</li>
      <li>显示列表96</li>
      <li>显示列表97</li>
      <li>显示列表98</li>
      <li>显示列表99</li>
      <li>显示列表100</li>
    </ul>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    // 参数1：绑定标签
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType:3,
      pullUpLoad:true
    })

    this.scroll.on('scroll',(position)=>{
      
    })

    this.scroll.on('pullingUp',()=>{
      
    })
  }
 }
</script>

<style  scoped>
  .wrapper{
    height:150px;
    background-color: red;

    overflow: hidden;
    /* overflow-y: scroll; */
  }
  
  
</style>