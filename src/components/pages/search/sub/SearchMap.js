import React, {Component} from 'react'
import EEMap, {planeSVG, targetSVG} from '../../../common/EEMap'

// LONDON
var london = {
    id: "london",
    color: "#000000",
    svgPath: targetSVG,
    title: "London",
    latitude: 51.5002,
    longitude: -0.1262,
    scale: 1.5,
    zoomLevel: 2.74,
    zoomLongitude: -20.1341,
    zoomLatitude: 49.1712,

    lines: [
        {
        latitudes: [51.5002, 50.4422],
        longitudes: [-0.1262, 30.5367]},
    {
        latitudes: [51.5002, 46.9480],
        longitudes: [-0.1262, 7.4481]},
    {
        latitudes: [51.5002, 59.3328],
        longitudes: [-0.1262, 18.0645]},
    {
        latitudes: [51.5002, 40.4167],
        longitudes: [-0.1262, -3.7033]},
    {
        latitudes: [51.5002, 46.0514],
        longitudes: [-0.1262, 14.5060]},
    {
        latitudes: [51.5002, 48.2116],
        longitudes: [-0.1262, 17.1547]},
    {
        latitudes: [51.5002, 44.8048],
        longitudes: [-0.1262, 20.4781]},
    {
        latitudes: [51.5002, 55.7558],
        longitudes: [-0.1262, 37.6176]},
    {
        latitudes: [51.5002, 38.7072],
        longitudes: [-0.1262, -9.1355]},
    {
        latitudes: [51.5002, 54.6896],
        longitudes: [-0.1262, 25.2799]},
    {
        latitudes: [51.5002, 64.1353],
        longitudes: [-0.1262, -21.8952]},
    {
        latitudes: [51.5002, 40.4300],
        longitudes: [-0.1262, -74.0000]}
    ],

    images: [{
        label: "Flights from London",
        svgPath: planeSVG,
        left: 100,
        top: 45,
        color: "#CC0000",
        labelColor: "#CC0000",
        labelRollOverColor: "#CC0000",
        labelFontSize: 20},
    {
        label: "show flights from Vilnius",
        left: 110,
        top: 70,
        labelColor: "#000000",
        labelRollOverColor: "#CC0000",
        labelFontSize: 11,
        linkToObject: "vilnius"}]
};


// VILNIUS
var vilnius = {
    id: "vilnius",
    color: "#000000",
    svgPath: targetSVG,
    title: "Vilnius",
    latitude: 54.6896,
    longitude: 25.2799,
    scale: 1.5,
    zoomLevel: 4.92,
    zoomLongitude: 15.4492,
    zoomLatitude: 50.2631,

    lines: [{
        latitudes: [54.6896, 50.8371],
        longitudes: [25.2799, 4.3676]},
    {
        latitudes: [54.6896, 59.9138],
        longitudes: [25.2799, 10.7387]},
    {
        latitudes: [54.6896, 40.4167],
        longitudes: [25.2799, -3.7033]},
    {
        latitudes: [54.6896, 50.0878],
        longitudes: [25.2799, 14.4205]},
    {
        latitudes: [54.6896, 48.2116],
        longitudes: [25.2799, 17.1547]},
    {
        latitudes: [54.6896, 44.8048],
        longitudes: [25.2799, 20.4781]},
    {
        latitudes: [54.6896, 55.7558],
        longitudes: [25.2799, 37.6176]},
    {
        latitudes: [54.6896, 37.9792],
        longitudes: [25.2799, 23.7166]},
    {
        latitudes: [54.6896, 54.6896],
        longitudes: [25.2799, 25.2799]},
    {
        latitudes: [54.6896, 51.5002],
        longitudes: [25.2799, -0.1262]},
    {
        latitudes: [54.6896, 53.3441],
        longitudes: [25.2799, -6.2675]}],

    images: [{
        label: "Flights from Vilnius",
        svgPath: planeSVG,
        left: 100,
        top: 45,
        color: "#CC0000",
        labelColor: "#CC0000",
        labelRollOverColor: "#CC0000",
        labelFontSize: 20},
    {
        label: "show flights from London",
        left: 110,
        top: 70,
        labelColor: "#000000",
        labelRollOverColor: "#CC0000",
        labelFontSize: 11,
        linkToObject: "london"}]
};

// cities
var cities = [
    london,
    vilnius,
{
    svgPath: targetSVG,
    title: "Brussels",
    latitude: 50.8371,
    longitude: 4.3676},
{
    svgPath: targetSVG,
    title: "Prague",
    latitude: 50.0878,
    longitude: 14.4205},
{
    svgPath: targetSVG,
    title: "Athens",
    latitude: 37.9792,
    longitude: 23.7166},
{
    svgPath: targetSVG,
    title: "Reykjavik",
    latitude: 64.1353,
    longitude: -21.8952},
{
    svgPath: targetSVG,
    title: "Dublin",
    latitude: 53.3441,
    longitude: -6.2675},
{
    svgPath: targetSVG,
    title: "Oslo",
    latitude: 59.9138,
    longitude: 10.7387},
{
    svgPath: targetSVG,
    title: "Lisbon",
    latitude: 38.7072,
    longitude: -9.1355},
{
    svgPath: targetSVG,
    title: "Moscow",
    latitude: 55.7558,
    longitude: 37.6176},
{
    svgPath: targetSVG,
    title: "Belgrade",
    latitude: 44.8048,
    longitude: 20.4781},
{
    svgPath: targetSVG,
    title: "Bratislava",
    latitude: 48.2116,
    longitude: 17.1547},
{
    svgPath: targetSVG,
    title: "Ljubljana",
    latitude: 46.0514,
    longitude: 14.5060},
{
    svgPath: targetSVG,
    title: "Madrid",
    latitude: 40.4167,
    longitude: -3.7033},
{
    svgPath: targetSVG,
    title: "Stockholm",
    latitude: 59.3328,
    longitude: 18.0645},
{
    svgPath: targetSVG,
    title: "Bern",
    latitude: 46.9480,
    longitude: 7.4481},
{
    svgPath: targetSVG,
    title: "Kiev",
    latitude: 50.4422,
    longitude: 30.5367},
{
    svgPath: targetSVG,
    title: "Paris",
    latitude: 48.8567,
    longitude: 2.3510},
{
    svgPath: targetSVG,
    title: "New York",
    latitude: 40.43,
    longitude: -74}];


export default class SearchMap extends Component {

  // getData(){
  //
  // }

  render(){

    // this.getData();
    console.log('cities', cities)
    console.log('vilnius', vilnius)
    return( <EEMap cities={cities}  linkToObject={vilnius} />)
  }
}
